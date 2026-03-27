/*
 * AI Service using Ollama (Local LLM)
 * Ollama runs on http://localhost:11434
 * No API key needed - runs entirely on your machine!
 */

// Uses Vite proxy: /api/ollama → http://localhost:11434
const OLLAMA_URL = '/api/ollama';

const SYSTEM_PROMPT = `คุณคือ "CodeBuddy" ผู้ช่วยสอนเขียนโค้ดที่เป็นมิตรและใจดี 
กฎของคุณ:
1. ตอบเป็นภาษาไทยเสมอ ยกเว้นโค้ดและศัพท์เทคนิค
2. อธิบายแบบเข้าใจง่าย เหมือนพี่สอนน้อง
3. ถ้านักเรียนถามเรื่องโค้ด ให้ยกตัวอย่างประกอบ
4. อย่าให้คำตอบโจทย์ทั้งหมดทันที ให้ hint หรือแนวคิดก่อน
5. ให้กำลังใจนักเรียนเสมอ
6. ถ้าโค้ดมี error ช่วยอธิบายสาเหตุและวิธีแก้ไข
7. ตอบให้กระชับ ไม่ยาวเกินไป (ไม่เกิน 200 คำ)
8. ใช้ emoji ให้เหมาะสมเพื่อความเป็นมิตร`;

// Get the selected Ollama model (default: llama3.2)
export function getModel() {
    return localStorage.getItem('ollama_model') || 'llama3.2';
}

export function setModel(model) {
    localStorage.setItem('ollama_model', model);
}

// Check if Ollama is running
export async function checkOllamaStatus() {
    try {
        const res = await fetch(OLLAMA_URL, { signal: AbortSignal.timeout(3000) });
        return res.ok;
    } catch {
        return false;
    }
}

// Get available models from Ollama
export async function getAvailableModels() {
    try {
        const res = await fetch(`${OLLAMA_URL}/api/tags`, { signal: AbortSignal.timeout(5000) });
        if (!res.ok) return [];
        const data = await res.json();
        return data.models || [];
    } catch {
        return [];
    }
}

export async function chatWithAI(messages, currentCode = '', lessonContext = '') {
    const model = getModel();

    let systemContent = SYSTEM_PROMPT;
    if (lessonContext) {
        systemContent += `\n\nบทเรียนปัจจุบัน: ${lessonContext}`;
    }
    if (currentCode) {
        systemContent += `\n\nโค้ดปัจจุบันของนักเรียน:\n\`\`\`\n${currentCode}\n\`\`\``;
    }

    const ollamaMessages = [
        { role: 'system', content: systemContent },
        ...messages.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
        })),
    ];

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 60000); // 60s timeout for local LLM

        const response = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model,
                messages: ollamaMessages,
                stream: false,
                options: {
                    temperature: 0.7,
                    num_predict: 512,
                },
            }),
            signal: controller.signal,
        });

        clearTimeout(timeout);

        if (!response.ok) {
            const errorText = await response.text().catch(() => '');
            if (errorText.includes('not found')) {
                return {
                    success: false,
                    message: `ไม่พบโมเดล "${model}" ใน Ollama\n\nลองรัน: ollama pull ${model}`,
                };
            }
            throw new Error(`Ollama error ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        const text = data.message?.content || 'ไม่สามารถสร้างคำตอบได้';

        return {
            success: true,
            message: text,
        };
    } catch (error) {
        if (error.name === 'AbortError') {
            return {
                success: false,
                message: 'AI ใช้เวลานานเกินไป กรุณาลองใหม่ หรือใช้โมเดลที่เล็กลง',
            };
        }

        // Connection refused = Ollama not running
        if (error.message?.includes('Failed to fetch') || error.name === 'TypeError') {
            return {
                success: false,
                message: '❌ ไม่สามารถเชื่อมต่อ Ollama ได้\n\n**วิธีแก้ไข:**\n1. ติดตั้ง Ollama จาก https://ollama.com\n2. เปิด Ollama\n3. รัน: `ollama pull llama3.2`\n4. ลองถามใหม่อีกครั้ง',
            };
        }

        return {
            success: false,
            message: `เกิดข้อผิดพลาด: ${error.message}`,
        };
    }
}

// These are kept for backward compatibility but no longer needed
export function getApiKey() { return ''; }
export function setApiKey() { }
export function removeApiKey() { }
