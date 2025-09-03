from flask import Flask, render_template, request, redirect, url_for, jsonify
import json
import os

app = Flask(__name__)

# 用户数据文件路径
USERS_FILE = 'users.json'
# 学生数据文件路径
STUDENTS_FILE = 'students.json'

# 初始化数据文件
if not os.path.exists(USERS_FILE):
    with open(USERS_FILE, 'w') as f:
        json.dump([{'username':'admin', 'password':'admin'}], f)

if not os.path.exists(STUDENTS_FILE):
    with open(STUDENTS_FILE, 'w') as f:
        json.dump([], f)

@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        
        with open(USERS_FILE, 'r') as f:
            users = json.load(f)
            
        for user in users:
            if user['username'] == username and user['password'] == password:
                return redirect(url_for('students'))
        
        return render_template('login.html', error='用户名或密码错误')
    
    return render_template('login.html')

@app.route('/students')
def students():
    with open(STUDENTS_FILE, 'r') as f:
        students = json.load(f)
    return render_template('students.html', students=students)

@app.route('/api/students', methods=['GET', 'POST'])
def handle_students():
    if request.method == 'GET':
        with open(STUDENTS_FILE, 'r') as f:
            students = json.load(f)
        return jsonify(students)
    
    elif request.method == 'POST':
        new_student = request.json
        with open(STUDENTS_FILE, 'r+') as f:
            students = json.load(f)
            students.append(new_student)
            f.seek(0)
            json.dump(students, f)
        return jsonify({'success': True})

@app.route('/api/students/<student_id>', methods=['PUT', 'DELETE'])
def handle_student(student_id):
    if request.method == 'PUT':
        updated_student = request.json
        with open(STUDENTS_FILE, 'r+') as f:
            students = json.load(f)
            for i, student in enumerate(students):
                if student['id'] == student_id:
                    students[i] = updated_student
                    break
            f.seek(0)
            json.dump(students, f)
        return jsonify({'success': True})
    
    elif request.method == 'DELETE':
        try:
            with open(STUDENTS_FILE, 'r+') as f:
                students = json.load(f)
                original_length = len(students)
                students = [s for s in students if str(s.get('id')) != str(student_id)]
                
                if len(students) == original_length:
                    return jsonify({'success': False, 'message': '学生不存在'}), 404
                    
                f.seek(0)
                json.dump(students, f)
                f.truncate()
                return jsonify({'success': True})
        except Exception as e:
            return jsonify({'success': False, 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)