const subjects = [
  {
    year: 1,
    semesters: [
      {
        name: "Primer semestre",
        subjects: [
          "Fundamentos de Matemáticas",
          "Álgebra",
          "Matemática Discreta",
          "Sistemas Digitales",
          "Programación I"
        ]
      },
      {
        name: "Segundo semestre",
        subjects: [
          "Fundamentos Tecnológicos y Físicos de la Informática",
          "Estadística",
          "Fundamentos de Computadores",
          "Programación II",
          "Cálculo y Análisis Numérico"
        ]
      }
    ]
  },
  {
    year: 2,
    semesters: [
      {
        name: "Primer semestre",
        subjects: [
          "Bases de Datos I",
          "Algoritmos y Estructuras de Datos",
          "Sistemas Operativos I",
          "Redes",
          "Programación Orientada a Objetos"
        ]
      },
      {
        name: "Segundo semestre",
        subjects: [
          "Gestión Financiera de Empresas",
          "Bases de Datos II",
          "Sistemas Operativos II",
          "Arquitectura de Computadores",
          "Computación Gráfica",
          "Diseño de Software"
        ]
      }
    ]
  },
  {
    year: 3,
    semesters: [
      {
        name: "Primer semestre",
        subjects: [
          "Teoría de Autómatas y Lenguajes Formales",
          "Administración de Sistemas y Redes",
          "Computación Distribuida",
          "Ingeniería del Software",
          "Inteligencia Artificial"
        ]
      },
      {
        name: "Segundo semestre",
        subjects: [
          "Desarrollo de Aplicaciones Web",
          "Gestión de Proyectos Informáticos",
          "Compiladores e Intérpretes",
          "Seguridad de la Información",
          "Ciberseguridad"
        ]
      }
    ]
  },
  {
    year: 4,
    semesters: [
      {
        name: "Primer semestre",
        subjects: [
          "Interacción Persona-Ordenador",
          "Ingeniería de Computadores",
          "Trabajo Fin de Grado",
          "Prácticas Externas",
          "Fundamentos de Sistemas Paralelos",
          "Visualización Avanzada",
          "Calidad de los Sistemas de Información",
          "Almacenes y Minería de Datos",
          "Conocimiento y Razonamiento Automático",
          "Sistemas Inteligentes",
          "Diseño y Administración de Redes",
          "Ingeniería de Servicios",
          "Computación en la Nube"
        ]
      },
      {
        name: "Segundo semestre",
        subjects: [
          "Computación Ubicua",
          "Programación de Arquitecturas Emergentes",
          "Gestión de Información no estructurada",
          "Modelos y Técnicas de Optimización",
          "Aprendizaje Automático"
        ]
      }
    ]
  }
];

// Cargar progreso desde localStorage
let completedSubjects = JSON.parse(localStorage.getItem("completedSubjects")) || [];

function saveProgress() {
  localStorage.setItem("completedSubjects", JSON.stringify(completedSubjects));
}

function isYearCompleted(year) {
  const requiredSubjects = subjects.find(y => y.year === year);
  const allSubjects = requiredSubjects.semesters.flatMap(s => s.subjects);
  return allSubjects.every(subject => completedSubjects.includes(subject));
}

function renderMalla() {
  const container = document.getElementById("malla-container");
  container.innerHTML = "";

  subjects.forEach((yearData, index) => {
    const yearDiv = document.createElement("div");
    yearDiv.className = "year";
    yearDiv.innerHTML = `<h2>Año ${yearData.year}</h2>`;

    const previousYearCompleted = yearData.year === 1 || isYearCompleted(yearData.year - 1);

    yearData.semesters.forEach(semester => {
      const semDiv = document.createElement("div");
      semDiv.className = "semester";
      semDiv.innerHTML = `<h3>${semester.name}</h3>`;

      semester.subjects.forEach(subject => {
        const subjDiv = document.createElement("div");
        subjDiv.className = "subject";
        subjDiv.textContent = subject;

        if (completedSubjects.includes(subject)) {
          subjDiv.classList.add("completed");
        } else if (previousYearCompleted) {
          subjDiv.classList.add("available");
          subjDiv.addEventListener("click", () => {
            completedSubjects.push(subject);
            saveProgress();
            renderMalla();
          });
        }

        semDiv.appendChild(subjDiv);
      });

      yearDiv.appendChild(semDiv);
    });

    container.appendChild(yearDiv);
  });
}

document.getElementById("reset").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas reiniciar tu progreso?")) {
    completedSubjects = [];
    saveProgress();
    renderMalla();
  }
});

renderMalla();
