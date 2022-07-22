(() => {
  function newStudentForm() {
    const form = document.createElement("form");

    const studentName = document.createElement("input");
    const studentSurname = document.createElement("input");
    const lastName = document.createElement("input");
    const entrance = document.createElement("input");
    const studentBirthDate = document.createElement("input");
    const studentFaculty = document.createElement("input");
    const addButton = document.createElement("button");

    studentName.placeholder = "Имя студента";
    studentSurname.placeholder = "Фамилия студента";
    lastName.placeholder = "Отчество студента";
    entrance.placeholder = "Дата поступления";

    studentFaculty.placeholder = "Факультет";
    studentBirthDate.placeholder = "Дата рождения";

    addButton.textContent = "Добавить студента";

    entrance.type = "number";
    entrance.setAttribute("min", "2000");
    entrance.setAttribute("onfocus", "(this.value = '2000')");
    entrance.setAttribute("max", new Date().getFullYear());
    studentBirthDate.setAttribute("onfocus", "(this.type = 'date')");
    studentBirthDate.setAttribute("min", "1900-01-01");

    studentName.required = "required";
    studentSurname.required = "required";
    lastName.required = "required";
    entrance.required = "required";
    studentFaculty.required = "required";
    studentBirthDate.required = "required";

    form.classList.add("row", "gx-3");
    form.style.marginBottom = "20px";
    form.style.marginTop = "50px";
    studentName.classList.add("col-sm");
    studentSurname.classList.add("col-sm");
    lastName.classList.add("col-sm");
    entrance.classList.add("col-sm");
    studentFaculty.classList.add("col-sm");
    studentBirthDate.classList.add("col-sm");

    addButton.classList.add("btn", "btn-primary");

    form.append(studentSurname);
    form.append(studentName);
    form.append(lastName);
    form.append(studentBirthDate);
    form.append(entrance);
    form.append(studentFaculty);
    form.append(addButton);

    return {
      form,
      studentSurname,
      studentName,
      lastName,
      studentBirthDate,
      entrance,
      studentFaculty,
    };
  }

  function studentsTable() {
    const table = document.createElement("table");
    const tableThead = document.createElement("thead");
    const mainString = document.createElement("tr");

    const stTableBody = document.createElement("tbody");
    const stTableBodyTwo = document.createElement("tbody");

    const stdTableName = document.createElement("th");
    const stdTableFaculty = document.createElement("th");
    const stdTableBirth = document.createElement("th");
    const stdTableEntrance = document.createElement("th");

    stdTableName.textContent = "ФИО студента";
    stdTableBirth.textContent = "Дата рождения";
    stdTableEntrance.textContent = "Дата поступления";
    stdTableFaculty.textContent = "Факультет";

    table.append(tableThead);
    table.append(stTableBody);

    tableThead.append(mainString);
    mainString.append(stdTableName);
    mainString.append(stdTableFaculty);
    mainString.append(stdTableBirth);
    mainString.append(stdTableEntrance);

    table.classList.add("table", "table-hover", "table-striped", "table-style");
    tableThead.classList.add("table-secondary");

    return {
      table,
      tableThead,
      stTableBody,
      stTableBodyTwo,
      mainString,
      stdTableName,
      stdTableFaculty,
      stdTableBirth,
      stdTableEntrance,
    };
  }

  function addNewStudent(student) {
    const newStudent = document.createElement("tr");
    const newStdName = document.createElement("td");
    const newStdBirth = document.createElement("td");
    const newStdEntrance = document.createElement("td");
    const newStdFaculty = document.createElement("td");

    newStdName.textContent =
      student.surname + " " + student.name + " " + student.lastname;
    newStdFaculty.textContent = student.faculty;
    newStdBirth.textContent = student.birth;
    newStdEntrance.textContent = `${student.entrance} - ${
      student.entrance + 4
    } (${
      new Date().getFullYear() - student.entrance >= 4
        ? "Закончил"
        : new Date().getFullYear() - student.entrance + " курс"
    })`;

    newStudent.append(newStdName);
    newStudent.append(newStdFaculty);
    newStudent.append(newStdBirth);
    newStudent.append(newStdEntrance);

    return {
      newStudent,
      newStdName,
      newStdBirth,
      newStdEntrance,
      newStdFaculty,
    };
  }

  function filterPanel() {
    const filterpanel = document.createElement("div");

    const firstAreaFilter = document.createElement("div");
    const secondAreaFilter = document.createElement("div");

    const findStudentInputFIO = document.createElement("input");
    const findStudentButtonByFIO = document.createElement("button");
    const findStudentButtonByFaculty = document.createElement("button");

    const findStudentByDateStartOrEnd = document.createElement("input");
    const findStudentByDatesBtn = document.createElement("button");

    findStudentButtonByFIO.textContent = "Найти по ФИО";
    findStudentButtonByFaculty.textContent = "Найти по факультету";

    findStudentByDatesBtn.textContent = "Найти по дате";

    findStudentByDateStartOrEnd.setAttribute("type", "number");

    findStudentByDateStartOrEnd.setAttribute("max", new Date().getFullYear());
    findStudentByDateStartOrEnd.setAttribute(
      "onfocus",
      "(this.value = '2000')"
    );

    filterpanel.classList.add("row");
    firstAreaFilter.classList.add("input-group", "col");
    secondAreaFilter.classList.add("input-group", "col");

    findStudentByDateStartOrEnd.classList.add("form-control");

    findStudentByDateStartOrEnd.placeholder = "Начало или конец обучения";

    findStudentByDatesBtn.classList.add("btn", "btn-outline-secondary");

    filterpanel.style.marginTop = "30px";
    filterpanel.style.marginBottom = "20px";
    findStudentInputFIO.classList.add("form-control");
    findStudentInputFIO.placeholder = "Введите что-то";
    findStudentButtonByFIO.classList.add("btn", "btn-outline-secondary");
    findStudentButtonByFaculty.classList.add("btn", "btn-outline-secondary");

    firstAreaFilter.append(findStudentInputFIO);
    firstAreaFilter.append(findStudentButtonByFIO);
    firstAreaFilter.append(findStudentButtonByFaculty);

    secondAreaFilter.append(findStudentByDateStartOrEnd);
    secondAreaFilter.append(findStudentByDatesBtn);

    filterpanel.append(firstAreaFilter);
    filterpanel.append(secondAreaFilter);

    return {
      filterpanel,
      firstAreaFilter,
      secondAreaFilter,
      findStudentInputFIO,
      findStudentButtonByFIO,
      findStudentButtonByFaculty,
      findStudentByDateStartOrEnd,
      findStudentByDatesBtn,
    };
  }

  function clientErrors(err) {
    const clientErrArea = document.createElement("div");
    clientErrArea.innerHTML = err;

    return {
      clientErrArea,
    };
  }

  document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("stdTable");
    const stdForm = newStudentForm();
    const stdTable = studentsTable();
    const panelFilter = filterPanel();
    let studentsMassive = [];

    stdForm.form.addEventListener("submit", function (e) {
      e.preventDefault();
      let student = {};

      if (
        stdForm.studentName.value.trim() == "" ||
        stdForm.studentSurname.value.trim() == "" ||
        stdForm.lastName.value.trim() == ""
      ) {
        const err = "Поля ФИО не должны быть пустыми";
        container.prepend(clientErrors(err).clientErrArea);
        return;
      }
      if (stdForm.studentBirthDate.valueAsDate < new Date(1900, 01, 01)) {
        const err = "Дата рождения не может быть меньше 01.01.1900";
        container.prepend(clientErrors(err).clientErrArea);
        return;
      }

      student.name = stdForm.studentName.value.trim();
      student.surname = stdForm.studentSurname.value.trim();
      student.lastname = stdForm.lastName.value.trim();
      student.birth =
        stdForm.studentBirthDate.valueAsDate.toISOString().substring(0, 10) +
        ` (${
          new Date().getFullYear() -
          stdForm.studentBirthDate.valueAsDate.getFullYear()
        } лет)`;
      student.entrance = stdForm.entrance.valueAsNumber;
      student.faculty = stdForm.studentFaculty.value.trim();

      studentsMassive.push(student);
      let newStudent = addNewStudent(student);
      stdTable.stTableBody.append(newStudent.newStudent);
      this.reset();
    });

    function redrawTable(mas) {
      let oldTableList = stdTable.stTableBody.querySelectorAll("tr");
      oldTableList.forEach((oldTableStudent) => {
        oldTableStudent.remove();
      });
      mas.forEach((student) => {
        stdTable.stTableBody.append(addNewStudent(student).newStudent);
      });
    }

    stdTable.stdTableName.addEventListener("click", function () {
      studentsMassive.sort((a, b) => {
        if (a.surname < b.surname) return -1;
      });
      redrawTable(studentsMassive);
    });

    stdTable.stdTableFaculty.addEventListener("click", function () {
      studentsMassive.sort((a, b) => {
        if (a.faculty < b.faculty) return -1;
      });
      redrawTable(studentsMassive);
    });

    stdTable.stdTableBirth.addEventListener("click", function () {
      studentsMassive.sort((a, b) => {
        if (a.birth > b.birth) return -1;
      });
      redrawTable(studentsMassive);
    });

    stdTable.stdTableEntrance.addEventListener("click", function () {
      studentsMassive.sort((a, b) => {
        if (a.entrance < b.entrance) return -1;
      });
      redrawTable(studentsMassive);
    });

    panelFilter.findStudentByDatesBtn.addEventListener("click", function () {
      let g = [];
      studentsMassive.forEach((student) => {
        if (
          student.entrance == panelFilter.findStudentByDateStartOrEnd.value ||
          student.entrance + 4 == panelFilter.findStudentByDateStartOrEnd.value
        ) {
          g.push(student);
          redrawTable(g);
        }
      });
    });

    panelFilter.findStudentButtonByFIO.addEventListener("click", function () {
      let g = [];
      studentsMassive.forEach((student) => {
        if (
          student.name
            .toUpperCase()
            .includes(panelFilter.findStudentInputFIO.value.toUpperCase()) ||
          student.surname
            .toUpperCase()
            .includes(panelFilter.findStudentInputFIO.value.toUpperCase()) ||
          student.lastname
            .toUpperCase()
            .includes(panelFilter.findStudentInputFIO.value.toUpperCase())
        ) {
          g.push(student);
          redrawTable(g);
        }
      });
    });

    panelFilter.findStudentButtonByFaculty.addEventListener(
      "click",
      function () {
        let g = [];
        studentsMassive.forEach((student) => {
          if (
            student.faculty
              .toUpperCase()
              .includes(panelFilter.findStudentInputFIO.value.toUpperCase())
          ) {
            g.push(student);
            redrawTable(g);
          }
        });
      }
    );
    container.append(stdForm.form);
    container.append(panelFilter.filterpanel);
    container.append(stdTable.table);
  });
})();
