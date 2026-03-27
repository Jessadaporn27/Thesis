const courses = [
    {
        id: 'python-fundamentals',
        title: 'Python Fundamentals',
        description: 'เรียนรู้พื้นฐานการเขียนโปรแกรมด้วย Python ตั้งแต่เริ่มต้นจนถึงฟังก์ชัน',
        language: 'python',
        languageVersion: '3.10.0',
        icon: '🐍',
        difficulty: 'Beginner',
        totalLessons: 8,
        color: '#3776AB',
        lessons: [
            {
                id: 'hello-world',
                title: '1. Hello World & การแสดงผล',
                content: `# Hello World & การแสดงผล 🎉

## เริ่มต้นกับ Python

Python เป็นภาษาที่เรียนรู้ง่ายและเป็นที่นิยมมากที่สุดในโลก ใช้งานได้ตั้งแต่ Web Development, Data Science ไปจนถึง AI

## ฟังก์ชัน print()

ใช้สำหรับแสดงผลข้อมูลออกทางหน้าจอ

\`\`\`python
print("Hello, World!")
print("สวัสดีชาว Python!")
\`\`\`

## การต่อข้อความ (String Concatenation)

\`\`\`python
name = "สมชาย"
print("สวัสดี " + name)
print(f"ยินดีต้อนรับ {name}")  # f-string (แนะนำ)
\`\`\`

## การแสดงผลหลายบรรทัด

\`\`\`python
print("บรรทัดที่ 1")
print("บรรทัดที่ 2")
print("---")
print("Hello", "World", "Python")  # คั่นด้วยช่องว่าง
\`\`\``,
                starterCode: `# ลองเขียน Hello World กันเถอะ!
print("Hello, World!")
`,
                challenges: [
                    {
                        id: 'ch1-1',
                        title: 'แสดงชื่อของคุณ',
                        description: 'เขียนโปรแกรมแสดงข้อความ "My name is Python" ออกทางหน้าจอ',
                        expectedOutput: 'My name is Python',
                        hint: 'ใช้ฟังก์ชัน print() และใส่ข้อความในเครื่องหมายคำพูด',
                        starterCode: `# เขียนโค้ดแสดงข้อความ "My name is Python"
`,
                    },
                    {
                        id: 'ch1-2',
                        title: 'แสดงผล 3 บรรทัด',
                        description: 'เขียนโปรแกรมแสดงผล 3 บรรทัดดังนี้:\nHello\nWorld\nPython',
                        expectedOutput: 'Hello\nWorld\nPython',
                        hint: 'ใช้ print() 3 ครั้ง แต่ละครั้งแสดงผลคนละคำ',
                        starterCode: `# แสดงผล Hello, World, Python คนละบรรทัด
`,
                    }
                ]
            },
            {
                id: 'variables',
                title: '2. ตัวแปร (Variables)',
                content: `# ตัวแปร (Variables) 📦

## ตัวแปรคืออะไร?

ตัวแปรเปรียบเหมือน **กล่องเก็บของ** ที่ใช้เก็บข้อมูลไว้ใช้งานภายหลัง

## การสร้างตัวแปร

ใน Python ไม่ต้องประกาศ type เหมือนภาษาอื่น

\`\`\`python
name = "สมชาย"        # String (ข้อความ)
age = 20               # Integer (จำนวนเต็ม)
height = 175.5         # Float (ทศนิยม)
is_student = True      # Boolean (จริง/เท็จ)
\`\`\`

## การใช้งานตัวแปร

\`\`\`python
x = 10
y = 20
result = x + y
print(result)     # 30

name = "Alice"
print(f"Hello {name}, you are {age} years old")
\`\`\`

## กฎการตั้งชื่อตัวแปร
- ต้องขึ้นต้นด้วยตัวอักษรหรือ underscore (_)
- ห้ามขึ้นต้นด้วยตัวเลข
- ห้ามใช้ keyword ของ Python (เช่น if, for, while)
- Case-sensitive: \`Name\` กับ \`name\` ไม่เหมือนกัน`,
                starterCode: `# ลองสร้างตัวแปรกัน!
name = "Alice"
age = 25
print(f"Name: {name}")
print(f"Age: {age}")
`,
                challenges: [
                    {
                        id: 'ch2-1',
                        title: 'คำนวณพื้นที่สี่เหลี่ยม',
                        description: 'สร้างตัวแปร width = 5 และ height = 10 แล้วคำนวณพื้นที่ (width * height) แสดงผลออกมาเป็น "Area: 50"',
                        expectedOutput: 'Area: 50',
                        hint: 'สร้างตัวแปร area = width * height แล้ว print(f"Area: {area}")',
                        starterCode: `# สร้างตัวแปร width และ height แล้วคำนวณพื้นที่
`,
                    },
                    {
                        id: 'ch2-2',
                        title: 'แลกค่าตัวแปร',
                        description: 'กำหนด a = 5 และ b = 10 แล้วสลับค่า ให้แสดงผลเป็น:\na = 10\nb = 5',
                        expectedOutput: 'a = 10\nb = 5',
                        hint: 'ใน Python สามารถเขียน a, b = b, a ได้เลย',
                        starterCode: `a = 5
b = 10
# สลับค่า a กับ b แล้วแสดงผล
`,
                    }
                ]
            },
            {
                id: 'data-types',
                title: '3. ชนิดข้อมูล (Data Types)',
                content: `# ชนิดข้อมูล (Data Types) 🏷️

## ชนิดข้อมูลหลักใน Python

| ชนิด | ตัวอย่าง | คำอธิบาย |
|------|---------|----------|
| \`int\` | 42, -10 | จำนวนเต็ม |
| \`float\` | 3.14, -0.5 | ทศนิยม |
| \`str\` | "Hello" | ข้อความ |
| \`bool\` | True, False | จริง/เท็จ |

## การแปลงชนิดข้อมูล (Type Casting)

\`\`\`python
# String → Integer
num_str = "42"
num = int(num_str)
print(num + 8)  # 50

# Integer → String
age = 25
text = "I am " + str(age)

# Float → Integer (ตัดทศนิยมทิ้ง)
pi = 3.14
print(int(pi))  # 3
\`\`\`

## ตรวจสอบชนิดข้อมูล

\`\`\`python
x = 42
print(type(x))  # <class 'int'>
\`\`\`

## การดำเนินการกับ String

\`\`\`python
text = "Hello Python"
print(len(text))         # 12
print(text.upper())      # HELLO PYTHON
print(text.lower())      # hello python
print(text[0:5])         # Hello
\`\`\``,
                starterCode: `# ลองเล่นกับชนิดข้อมูลต่างๆ
x = 42
y = 3.14
name = "Python"

print(type(x))
print(type(y))
print(type(name))
print(int(y))
`,
                challenges: [
                    {
                        id: 'ch3-1',
                        title: 'แปลงและคำนวณ',
                        description: 'กำหนด a = "10" และ b = "20" (เป็น string) ให้แปลงเป็น integer แล้วบวกกัน แสดงผลเป็น "Sum: 30"',
                        expectedOutput: 'Sum: 30',
                        hint: 'ใช้ int() เพื่อแปลง string เป็น integer',
                        starterCode: `a = "10"
b = "20"
# แปลงเป็น int แล้วบวกกัน
`,
                    },
                    {
                        id: 'ch3-2',
                        title: 'ข้อมูลส่วนตัว',
                        description: 'สร้างตัวแปร name = "Alice" และ age = 20 แล้วแสดงผลเป็น:\nName: Alice\nAge: 20\nType: <class \'str\'>',
                        expectedOutput: "Name: Alice\nAge: 20\nType: <class 'str'>",
                        hint: 'ใช้ f-string และ type() ตรวจสอบชนิด',
                        starterCode: `# สร้างตัวแปรและแสดงข้อมูลส่วนตัว
`,
                    }
                ]
            },
            {
                id: 'operators',
                title: '4. ตัวดำเนินการ (Operators)',
                content: `# ตัวดำเนินการ (Operators) ➕

## ตัวดำเนินการทางคณิตศาสตร์

| Operator | ความหมาย | ตัวอย่าง |
|----------|---------|---------|
| \`+\` | บวก | 5 + 3 = 8 |
| \`-\` | ลบ | 5 - 3 = 2 |
| \`*\` | คูณ | 5 * 3 = 15 |
| \`/\` | หาร | 5 / 3 = 1.666... |
| \`//\` | หารปัดลง | 5 // 3 = 1 |
| \`%\` | เศษ (Modulo) | 5 % 3 = 2 |
| \`**\` | ยกกำลัง | 5 ** 3 = 125 |

## ตัวดำเนินการเปรียบเทียบ

\`\`\`python
print(5 > 3)   # True
print(5 < 3)   # False
print(5 == 5)  # True
print(5 != 3)  # True
print(5 >= 5)  # True
\`\`\`

## ตัวดำเนินการทางตรรกะ

\`\`\`python
print(True and False)   # False
print(True or False)    # True
print(not True)         # False
\`\`\`

## ลำดับความสำคัญ
1. \`**\` (ยกกำลัง)
2. \`*\`, \`/\`, \`//\`, \`%\`
3. \`+\`, \`-\`
4. \`==\`, \`!=\`, \`<\`, \`>\`, \`<=\`, \`>=\`
5. \`not\`, \`and\`, \`or\``,
                starterCode: `# ลองใช้ตัวดำเนินการต่างๆ
a = 10
b = 3

print(f"a + b = {a + b}")
print(f"a / b = {a / b}")
print(f"a // b = {a // b}")
print(f"a % b = {a % b}")
print(f"a ** b = {a ** b}")
`,
                challenges: [
                    {
                        id: 'ch4-1',
                        title: 'เครื่องคิดเลข',
                        description: 'กำหนด x = 15 และ y = 4 แสดงผลดังนี้:\n15 + 4 = 19\n15 - 4 = 11\n15 * 4 = 60\n15 / 4 = 3.75',
                        expectedOutput: '15 + 4 = 19\n15 - 4 = 11\n15 * 4 = 60\n15 / 4 = 3.75',
                        hint: 'ใช้ f-string เพื่อแสดงผลในรูปแบบที่ต้องการ',
                        starterCode: `x = 15
y = 4
# แสดงผลการบวก ลบ คูณ หาร
`,
                    },
                    {
                        id: 'ch4-2',
                        title: 'คู่หรือคี่?',
                        description: 'กำหนด num = 7 ตรวจสอบว่าเป็นเลขคู่หรือคี่ แสดงผลเป็น "7 is odd"',
                        expectedOutput: '7 is odd',
                        hint: 'ใช้ % (modulo) เพื่อหาเศษจากการหาร 2 ถ้าเศษ = 0 คือเลขคู่',
                        starterCode: `num = 7
# ตรวจสอบว่า num เป็นเลขคู่หรือคี่
`,
                    }
                ]
            },
            {
                id: 'conditionals',
                title: '5. เงื่อนไข (if/else)',
                content: `# เงื่อนไข (Conditionals) 🔀

## if Statement

ใช้ตรวจสอบเงื่อนไข ถ้าเป็นจริงจะทำงานในบล็อก

\`\`\`python
age = 18
if age >= 18:
    print("คุณเป็นผู้ใหญ่")
\`\`\`

## if-else

\`\`\`python
score = 75
if score >= 50:
    print("สอบผ่าน ✅")
else:
    print("สอบไม่ผ่าน ❌")
\`\`\`

## if-elif-else

\`\`\`python
score = 85
if score >= 80:
    grade = "A"
elif score >= 70:
    grade = "B"
elif score >= 60:
    grade = "C"
elif score >= 50:
    grade = "D"
else:
    grade = "F"
print(f"Grade: {grade}")
\`\`\`

## Nested if

\`\`\`python
age = 25
has_license = True

if age >= 18:
    if has_license:
        print("สามารถขับรถได้")
    else:
        print("ต้องมีใบขับขี่ก่อน")
else:
    print("อายุไม่ถึง")
\`\`\``,
                starterCode: `# ลองใช้ if-else
score = 75

if score >= 80:
    print("Grade: A")
elif score >= 70:
    print("Grade: B")
elif score >= 60:
    print("Grade: C")
else:
    print("Grade: F")
`,
                challenges: [
                    {
                        id: 'ch5-1',
                        title: 'ตรวจสอบอายุ',
                        description: 'กำหนด age = 15 ถ้า age >= 18 แสดง "Adult" ถ้าไม่ แสดง "Minor"',
                        expectedOutput: 'Minor',
                        hint: 'ใช้ if-else ตรวจสอบค่า age',
                        starterCode: `age = 15
# ตรวจสอบว่าเป็นผู้ใหญ่หรือเด็ก
`,
                    },
                    {
                        id: 'ch5-2',
                        title: 'เกรดคะแนน',
                        description: 'กำหนด score = 72 ให้แสดงเกรดตามเกณฑ์:\n>=80: A, >=70: B, >=60: C, >=50: D, อื่นๆ: F\nแสดงผลเป็น "Grade: B"',
                        expectedOutput: 'Grade: B',
                        hint: 'ใช้ if-elif-else ตรวจสอบช่วงคะแนน',
                        starterCode: `score = 72
# ตรวจสอบเกรดและแสดงผล
`,
                    }
                ]
            },
            {
                id: 'loops',
                title: '6. ลูป (Loops)',
                content: `# ลูป (Loops) 🔄

## for Loop

ใช้วนซ้ำตามจำนวนที่กำหนด

\`\`\`python
# วนซ้ำด้วย range
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# วนซ้ำใน list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

## while Loop

วนซ้ำตราบใดที่เงื่อนไขเป็นจริง

\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

## break และ continue

\`\`\`python
# break - หยุดลูปทันที
for i in range(10):
    if i == 5:
        break
    print(i)  # 0, 1, 2, 3, 4

# continue - ข้ามรอบปัจจุบัน
for i in range(5):
    if i == 2:
        continue
    print(i)  # 0, 1, 3, 4
\`\`\`

## Nested Loop

\`\`\`python
for i in range(3):
    for j in range(3):
        print(f"({i},{j})", end=" ")
    print()
\`\`\``,
                starterCode: `# ลองใช้ for loop
for i in range(1, 6):
    print(f"รอบที่ {i}")

print("---")

# while loop
count = 5
while count > 0:
    print(f"นับถอยหลัง: {count}")
    count -= 1
print("ปล่อย! 🚀")
`,
                challenges: [
                    {
                        id: 'ch6-1',
                        title: 'ผลรวม 1-10',
                        description: 'เขียนโปรแกรมหาผลรวมของ 1 ถึง 10 แสดงผลเป็น "Sum: 55"',
                        expectedOutput: 'Sum: 55',
                        hint: 'ใช้ for loop กับ range(1, 11) และตัวแปรสะสมค่า',
                        starterCode: `# หาผลรวมของตัวเลข 1 ถึง 10
`,
                    },
                    {
                        id: 'ch6-2',
                        title: 'สูตรคูณ',
                        description: 'แสดงสูตรคูณแม่ 3 (3x1 ถึง 3x5):\n3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
                        expectedOutput: '3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15',
                        hint: 'ใช้ for loop วนจาก 1 ถึง 5',
                        starterCode: `# แสดงสูตรคูณแม่ 3
`,
                    }
                ]
            },
            {
                id: 'functions',
                title: '7. ฟังก์ชัน (Functions)',
                content: `# ฟังก์ชัน (Functions) ⚡

## ทำไมต้องใช้ฟังก์ชัน?

- **ลดการเขียนซ้ำ** - เขียนครั้งเดียว ใช้ได้หลายครั้ง
- **อ่านง่าย** - แบ่งโค้ดเป็นส่วนๆ
- **แก้ไขง่าย** - แก้ที่เดียว มีผลทุกที่

## สร้างฟังก์ชัน

\`\`\`python
def greet(name):
    print(f"Hello, {name}!")

greet("Alice")   # Hello, Alice!
greet("Bob")     # Hello, Bob!
\`\`\`

## ฟังก์ชันที่คืนค่า (return)

\`\`\`python
def add(a, b):
    return a + b

result = add(3, 5)
print(result)  # 8
\`\`\`

## Default Parameters

\`\`\`python
def greet(name, greeting="Hello"):
    print(f"{greeting}, {name}!")

greet("Alice")              # Hello, Alice!
greet("Bob", "สวัสดี")      # สวัสดี, Bob!
\`\`\`

## ฟังก์ชันหลาย return values

\`\`\`python
def min_max(numbers):
    return min(numbers), max(numbers)

lo, hi = min_max([3, 1, 4, 1, 5])
print(f"Min: {lo}, Max: {hi}")
\`\`\``,
                starterCode: `# สร้างฟังก์ชันกัน!
def greet(name):
    return f"Hello, {name}!"

def add(a, b):
    return a + b

print(greet("Python"))
print(f"3 + 5 = {add(3, 5)}")
`,
                challenges: [
                    {
                        id: 'ch7-1',
                        title: 'ฟังก์ชันหาพื้นที่วงกลม',
                        description: 'สร้างฟังก์ชัน circle_area(r) ที่คำนวณพื้นที่วงกลม (3.14 * r * r) แล้วเรียกใช้ด้วย r = 5 แสดงผลเป็น "Area: 78.5"',
                        expectedOutput: 'Area: 78.5',
                        hint: 'สูตร: area = 3.14 * r * r และ return ค่าออกมา',
                        starterCode: `# สร้างฟังก์ชัน circle_area(r)
`,
                    },
                    {
                        id: 'ch7-2',
                        title: 'ฟังก์ชัน Factorial',
                        description: 'สร้างฟังก์ชัน factorial(n) ที่คำนวณ n! (5! = 120) แสดงผลเป็น "5! = 120"',
                        expectedOutput: '5! = 120',
                        hint: 'ใช้ loop คูณค่าจาก 1 ถึง n หรือใช้ recursion',
                        starterCode: `# สร้างฟังก์ชัน factorial(n)
`,
                    }
                ]
            },
            {
                id: 'lists',
                title: '8. ลิสต์ (Lists)',
                content: `# ลิสต์ (Lists) 📋

## List คืออะไร?

List คือโครงสร้างข้อมูลที่เก็บข้อมูลหลายตัวไว้ด้วยกัน

\`\`\`python
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = [1, "hello", True, 3.14]
\`\`\`

## เข้าถึงข้อมูลใน List

\`\`\`python
fruits = ["apple", "banana", "cherry"]
print(fruits[0])     # apple (index เริ่มที่ 0)
print(fruits[-1])    # cherry (ตัวสุดท้าย)
print(fruits[1:3])   # ["banana", "cherry"]
\`\`\`

## เพิ่ม/ลบข้อมูล

\`\`\`python
fruits = ["apple", "banana"]
fruits.append("cherry")       # เพิ่มท้าย
fruits.insert(1, "mango")     # แทรกตำแหน่ง 1
fruits.remove("banana")       # ลบตามค่า
fruits.pop()                  # ลบตัวสุดท้าย
\`\`\`

## List Methods ที่ใช้บ่อย

\`\`\`python
nums = [3, 1, 4, 1, 5, 9]
print(len(nums))        # 6
print(sorted(nums))     # [1, 1, 3, 4, 5, 9]
print(sum(nums))        # 23
print(max(nums))        # 9
print(min(nums))        # 1
\`\`\`

## List Comprehension

\`\`\`python
squares = [x**2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

evens = [x for x in range(1, 11) if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]
\`\`\``,
                starterCode: `# ลองเล่นกับ List
fruits = ["apple", "banana", "cherry", "date"]

print(f"First: {fruits[0]}")
print(f"Last: {fruits[-1]}")
print(f"Count: {len(fruits)}")

# เพิ่มผลไม้
fruits.append("elderberry")
print(f"After append: {fruits}")

# List comprehension
squares = [x**2 for x in range(1, 6)]
print(f"Squares: {squares}")
`,
                challenges: [
                    {
                        id: 'ch8-1',
                        title: 'หาค่ามากสุดและน้อยสุด',
                        description: 'กำหนด nums = [4, 2, 9, 1, 7] ให้หาค่ามากสุดและน้อยสุด แสดงผลเป็น:\nMax: 9\nMin: 1',
                        expectedOutput: 'Max: 9\nMin: 1',
                        hint: 'ใช้ max() และ min() กับ list',
                        starterCode: `nums = [4, 2, 9, 1, 7]
# หาค่า max และ min
`,
                    },
                    {
                        id: 'ch8-2',
                        title: 'กรองเลขคู่',
                        description: 'กำหนด nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] ให้กรองเฉพาะเลขคู่ แสดงผลเป็น "[2, 4, 6, 8, 10]"',
                        expectedOutput: '[2, 4, 6, 8, 10]',
                        hint: 'ใช้ list comprehension กับ if x % 2 == 0',
                        starterCode: `nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# กรองเฉพาะเลขคู่
`,
                    }
                ]
            }
        ]
    },
    {
        id: 'javascript-basics',
        title: 'JavaScript Basics',
        description: 'เรียนรู้พื้นฐาน JavaScript สำหรับ Web Development',
        language: 'javascript',
        languageVersion: '18.15.0',
        icon: '⚡',
        difficulty: 'Beginner',
        totalLessons: 5,
        color: '#F7DF1E',
        lessons: [
            {
                id: 'js-hello',
                title: '1. Hello JavaScript',
                content: `# Hello JavaScript! ⚡

## JavaScript คืออะไร?

JavaScript เป็นภาษาหลักของ Web Development ใช้สร้าง Website, Web App, Mobile App, และอีกมากมาย

## console.log()

ใช้แสดงผลข้อมูล (เหมือน print ใน Python)

\`\`\`javascript
console.log("Hello, World!");
console.log(42);
console.log(true);
\`\`\`

## ตัวแปร

\`\`\`javascript
let name = "Alice";        // เปลี่ยนค่าได้
const PI = 3.14;          // เปลี่ยนค่าไม่ได้
var old = "แบบเก่า";       // ไม่แนะนำใช้แล้ว

console.log(name);
console.log(\`PI = \${PI}\`);  // Template literal
\`\`\`

## ชนิดข้อมูล

\`\`\`javascript
let num = 42;                // Number
let text = "Hello";          // String
let isOk = true;             // Boolean
let items = [1, 2, 3];       // Array
let obj = {name: "Alice"};   // Object
\`\`\``,
                starterCode: `// ลองเขียน JavaScript กันเถอะ!
console.log("Hello, JavaScript!");

let name = "World";
console.log(\`สวัสดี \${name}\`);
`,
                challenges: [
                    {
                        id: 'js-ch1-1',
                        title: 'แนะนำตัว',
                        description: 'สร้างตัวแปร name = "JavaScript" และ year = 1995 แล้วแสดงผลเป็น "JavaScript was created in 1995"',
                        expectedOutput: 'JavaScript was created in 1995',
                        hint: 'ใช้ Template literal: `${name} was created in ${year}`',
                        starterCode: `// สร้างตัวแปรและแสดงผล
`,
                    }
                ]
            },
            {
                id: 'js-functions',
                title: '2. Functions',
                content: `# Functions ใน JavaScript 🔧

## Function Declaration

\`\`\`javascript
function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Alice"));
\`\`\`

## Arrow Function (แบบสั้น)

\`\`\`javascript
const add = (a, b) => a + b;
const square = x => x * x;

console.log(add(3, 5));    // 8
console.log(square(4));     // 16
\`\`\`

## Default Parameters

\`\`\`javascript
function greet(name = "World") {
  console.log(\`Hello, \${name}!\`);
}
greet();         // Hello, World!
greet("Alice");  // Hello, Alice!
\`\`\``,
                starterCode: `// Functions ใน JavaScript
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;

console.log(\`5 + 3 = \${add(5, 3)}\`);
console.log(\`5 x 3 = \${multiply(5, 3)}\`);
`,
                challenges: [
                    {
                        id: 'js-ch2-1',
                        title: 'ฟังก์ชัน Max',
                        description: 'สร้างฟังก์ชัน findMax(a, b, c) ที่หาค่ามากสุดจาก 3 ตัวเลข เรียกใช้ findMax(10, 25, 15) แสดงผลเป็น "Max: 25"',
                        expectedOutput: 'Max: 25',
                        hint: 'ใช้ Math.max(a, b, c) หรือเปรียบเทียบด้วย if',
                        starterCode: `// สร้างฟังก์ชัน findMax
`,
                    }
                ]
            },
            {
                id: 'js-arrays',
                title: '3. Arrays',
                content: `# Arrays ใน JavaScript 📦

## สร้าง Array

\`\`\`javascript
let fruits = ["apple", "banana", "cherry"];
let nums = [1, 2, 3, 4, 5];
\`\`\`

## Methods สำคัญ

\`\`\`javascript
let arr = [1, 2, 3];
arr.push(4);        // เพิ่มท้าย [1,2,3,4]
arr.pop();          // ลบท้าย [1,2,3]
arr.unshift(0);     // เพิ่มหน้า [0,1,2,3]

console.log(arr.length);     // 4
console.log(arr.includes(2)); // true
\`\`\`

## map, filter, reduce

\`\`\`javascript
let nums = [1, 2, 3, 4, 5];

// map: แปลงทุกตัว
let doubled = nums.map(x => x * 2);
console.log(doubled);  // [2,4,6,8,10]

// filter: กรอง
let evens = nums.filter(x => x % 2 === 0);
console.log(evens);  // [2,4]

// reduce: รวมค่า
let sum = nums.reduce((acc, x) => acc + x, 0);
console.log(sum);  // 15
\`\`\``,
                starterCode: `// ลองเล่นกับ Arrays
let nums = [1, 2, 3, 4, 5];

let doubled = nums.map(x => x * 2);
console.log("Doubled:", doubled);

let sum = nums.reduce((acc, x) => acc + x, 0);
console.log("Sum:", sum);
`,
                challenges: [
                    {
                        id: 'js-ch3-1',
                        title: 'กรองและรวม',
                        description: 'กำหนด nums = [1,2,3,4,5,6,7,8,9,10] กรองเลขคี่แล้วหาผลรวม แสดงผลเป็น "Sum of odds: 25"',
                        expectedOutput: 'Sum of odds: 25',
                        hint: 'ใช้ filter กับ reduce ต่อกัน',
                        starterCode: `let nums = [1,2,3,4,5,6,7,8,9,10];
// กรองเลขคี่แล้วหาผลรวม
`,
                    }
                ]
            },
            {
                id: 'js-objects',
                title: '4. Objects',
                content: `# Objects ใน JavaScript 🏗️

## สร้าง Object

\`\`\`javascript
let person = {
  name: "Alice",
  age: 25,
  city: "Bangkok"
};

console.log(person.name);     // Alice
console.log(person["age"]);   // 25
\`\`\`

## แก้ไข Object

\`\`\`javascript
person.email = "alice@mail.com";  // เพิ่ม
person.age = 26;                   // แก้ไข
delete person.city;                // ลบ
\`\`\`

## Object Methods

\`\`\`javascript
let calc = {
  add: (a, b) => a + b,
  sub: (a, b) => a - b
};
console.log(calc.add(5, 3));  // 8
\`\`\`

## Destructuring

\`\`\`javascript
let {name, age} = person;
console.log(name);  // Alice
console.log(age);   // 26
\`\`\``,
                starterCode: `// Objects ใน JavaScript
let student = {
  name: "สมชาย",
  age: 20,
  scores: [85, 90, 78]
};

console.log(\`Name: \${student.name}\`);
console.log(\`Age: \${student.age}\`);

let avg = student.scores.reduce((a, b) => a + b) / student.scores.length;
console.log(\`Average: \${avg.toFixed(1)}\`);
`,
                challenges: [
                    {
                        id: 'js-ch4-1',
                        title: 'ข้อมูลนักเรียน',
                        description: 'สร้าง Object student ที่มี name="Bob" และ grade="A" แสดงผลเป็น "Bob got grade A"',
                        expectedOutput: 'Bob got grade A',
                        hint: 'สร้าง object แล้วใช้ template literal แสดงผล',
                        starterCode: `// สร้าง Object student
`,
                    }
                ]
            },
            {
                id: 'js-loops',
                title: '5. Loops & Conditions',
                content: `# Loops & Conditions ใน JavaScript 🔄

## if-else

\`\`\`javascript
let score = 85;
if (score >= 80) {
  console.log("Grade: A");
} else if (score >= 70) {
  console.log("Grade: B");
} else {
  console.log("Grade: F");
}
\`\`\`

## for Loop

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}

// for...of (วน Array)
let fruits = ["apple", "banana", "cherry"];
for (let fruit of fruits) {
  console.log(fruit);
}
\`\`\`

## while Loop

\`\`\`javascript
let count = 5;
while (count > 0) {
  console.log(count);
  count--;
}
console.log("Go!");
\`\`\`

## Ternary Operator

\`\`\`javascript
let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // Adult
\`\`\``,
                starterCode: `// Loops & Conditions
for (let i = 1; i <= 5; i++) {
  let type = i % 2 === 0 ? "even" : "odd";
  console.log(\`\${i} is \${type}\`);
}
`,
                challenges: [
                    {
                        id: 'js-ch5-1',
                        title: 'FizzBuzz',
                        description: 'แสดงเลข 1-5 ถ้าหารด้วย 3 ลงตัวแสดง Fizz ถ้าไม่แสดงเลข:\n1\n2\nFizz\n4\n5',
                        expectedOutput: '1\n2\nFizz\n4\n5',
                        hint: 'ใช้ if กับ % (modulo) ตรวจสอบ',
                        starterCode: `// FizzBuzz 1-5
`,
                    }
                ]
            }
        ]
    }
];

export default courses;
