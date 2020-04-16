/**
 *      "A+" : 95,
        "A" : 90,
        "A-" : 85,
        "B+" : 80,
        "B" : 75,
        "B-" : 70,
        "C+" : 65,
        "C" : 60,
        "C-" : 55,
        "D" : 50,
        "F" : 0,
 */

window.onload = () => {
    const data = JSON.parse(localStorage.getItem('data'));
    const total = data.find(element => element.studentID == 'total');
    const weights = total.quizzes *1 + total.midterm *1 + total.final *1;
    const yaxis = data.length;
    const cutoffs = {
        "A+": 0,
        "A": 0,
        "A-": 0,
        "B+": 0,
        "B": 0,
        "B-": 0,
        "C+": 0,
        "C": 0,
        "C-": 0,
        "D": 0,
        "F": 0,
    }

    const getStudentGrade = (student) => {
        return ((student.quizzes * total.quizzes) + (student.midterm * total.midterm) + (student.final * total.final)) / weights;
    } 

    const filterRange = (arr, range) => {
        return arr.filter(item => (item >= range));
    }

    const getGrade = value => {
        let grade = null;

        Object.keys(cutoffs).filter(key => cutoffs[key] > 0).some(key => {
            if (value >= cutoffs[key]) {
                grade = key;
                return true;
            }
        });
        
        return grade;
    }


    const drawHistogram = (key) => {
        const studentData = data.filter(id => id.studentID != "total").map(student => getStudentGrade(student))
        const histoData =  studentData.map(getGrade);

        $(".verticalChart").empty();
        Object.keys(cutoffs).map(key => {
            const height = ((histoData.filter(c => c === key).length) / yaxis) * 100;
            $('.verticalChart').append(`
                <div class="singleBar">
                    <div class="bar">
                        <div class="value" style="height: ${height}%;">
                            <span style="color: rgb(45, 137, 239); display: inline;">${histoData.filter(c => c === key).length}</span>
                        </div>
                    </div>
                    <div class="title">${key}</div>
                </div>
            `)
        })
    }

    const displayGrades = () => {
        const studentData = data.filter(id => id.studentID != "total").map(student => {
            const grade = getStudentGrade(student);
            return {...student, percentage: `${grade}%`, letter: getGrade(grade)} 
        })

        studentData.map(student => {
            const row = 
            `<tr>
                <td>${student.studentID}</td>
                <td>${student.quizzes}</td>
                <td>${student.midterm}</td>
                <td>${student.final}</td>
                <td>${student.percentage}</td>
                <td>${student.letter}</td>
            </tr>`;
            $("#studentData tbody").append(row);
        })
    }

    const checkInputs = () => {
        return !$('.input-required').filter(function() {
             return !this.value;   
         }).length;
    }

    const cutOff = document.querySelector('#cutOff');
    cutOff.addEventListener('change', (event) => {
        const value = event.target.value * 1;
        const key = event.target.name;

        if(isNaN(value)){
            alert("you have entered not a number, enter a number")
            return;
        }

        if(checkInputs()) {
            displayGrades()
        }
        
        cutoffs[key] = value;
        drawHistogram(key);
    });

}