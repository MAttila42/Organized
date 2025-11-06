import "clsx";
import i18next from "i18next";
const color$4 = "Farbe";
const labels$4 = "Beschriftungen";
const labelsLoading$4 = "Beschriftungen werden geladen...";
const noLabelsAdded$4 = "Noch keine Beschriftungen hinzugefügt.";
const noLabels$4 = "Keine Beschriftungen verfügbar";
const save$4 = "Speichern";
const remove$4 = "Entfernen";
const module$4 = { "edit": "Modulkarte bearbeiten", "labels": { "remove": { "aria": "Label entfernen" }, "addAnother": "Ein weiteres Label hinzufügen...", "add": "Label hinzufügen..." } };
const cancel$4 = "Abbrechen";
const icon$4 = "Symbol";
const shortcut$4 = { "edit": "Tastenkürzel bearbeiten", "card": { "aria": "Tastenkürzel" } };
const finances$4 = { "wallet": { "overview": { "title": "Übersicht", "description": "Wählen Sie eine Brieftasche, um ihre Transaktionen und den Kontostand anzuzeigen." }, "pick": "Wählen Sie eine Brieftasche, um Transaktionen zu verfolgen.", "dialog": { "title": "Transaktion aufzeichnen", "description": "Positive Beträge erhöhen den Kontostand, negative Beträge verringern ihn.", "income": "Einkommen", "expense": "Ausgabe", "amount": "Betrag", "date": "Datum", "note": "Notizen", "save": "Transaktion speichern", "notePlaceholder": "Optionale Beschreibung" }, "currentBalance": "Aktueller Kontostand", "addTransaction": "Transaktion hinzufügen", "income": "Einkommen", "expense": "Ausgabe", "transactions": { "title": "Transaktionen", "description": "Neueste zuerst.", "noTransactions": "Noch keine Transaktionen aufgezeichnet.", "delete": "Transaktion löschen", "noDate": "Kein Datum" }, "labels": { "balances": { "empty": "Noch keine Brieftaschen verfolgt." } }, "selector": { "title": "Brieftaschen", "description": "Erstellen Sie Brieftaschen, um Budgets und Ersparnisse zu trennen.", "empty": "Noch keine Brieftaschen. Fügen Sie Ihre erste Brieftasche hinzu, um loszulegen.", "transactionSingular": "Transaktion", "transactionPlural": "Transaktionen", "edit": { "aria": "Brieftaschendetails bearbeiten", "title": "Brieftasche bearbeiten", "nameLabel": "Name", "delete": "Brieftasche löschen" }, "addTrigger": "Brieftasche hinzufügen", "create": { "title": "Neue Brieftasche", "description": "Setzen Sie einen Namen, eine Farbe und eine optionale Beschreibung.", "nameLabel": "Name", "namePlaceholder": "Tägliche Ausgaben", "descriptionPlaceholder": "Kurze Notizen", "cta": "Brieftasche erstellen" } } } };
const home$4 = { "selectModule": "Modul auswählen", "selectShortcut": "Tastenkürzel auswählen", "heading": "Organized", "settings": { "aria": "Einstellungen" }, "shortcuts": { "add": { "aria": "Neues Tastenkürzel hinzufügen", "title": "Tastenkürzel hinzufügen", "iconLabel": "Symbol", "colorLabel": "Farbe", "cta": "Tastenkürzel hinzufügen" } }, "modules": { "add": { "trigger": "Modul hinzufügen", "title": "Modul hinzufügen", "cta": "Modul hinzufügen" } } };
const loading$4 = "Wird geladen...";
const settings$4 = { "language": { "selectPrompt": "Sprache auswählen", "title": "Sprache", "description": "Wählen Sie die Sprache, die Organisiert im gesamten App verwendet.", "note": "Änderungen werden sofort angewendet und bleiben über Sitzungen hinweg erhalten." }, "header": { "title": "Einstellungen" } };
const back$4 = "Zurück";
const edit$4 = "Bearbeiten";
const modules$4 = { "study": { "name": "Studium", "description": "Barebones-Studienmodul.", "links": { "classesToday": { "name": "Kurse heute", "description": "Liste der heutigen Kurse." }, "dueAssignments": { "name": "Fällige Aufgaben", "description": "Unvollständige Aufgaben, sortiert nach Fälligkeitsdatum." }, "upcomingExams": { "name": "Anstehende Prüfungen", "description": "Prüfungen, die in der nächsten Woche geplant sind." }, "addAssignment": { "name": "Aufgabe hinzufügen", "description": "Zum Studienmodul springen und das Dialogfeld zum Hinzufügen einer Aufgabe öffnen." }, "addExam": { "name": "Prüfung hinzufügen", "description": "Zum Studienmodul springen und das Dialogfeld zum Hinzufügen einer Prüfung öffnen." } } }, "shopping": { "name": "Einkaufen", "description": "Barebones-Einkaufsmodul.", "links": { "list": { "name": "Einkaufsliste", "description": "Liste der Artikel, die gekauft werden sollen." }, "addItem": { "name": "Artikel hinzufügen", "description": "Zum Einkaufsmodul springen und das Dialogfeld zum Hinzufügen eines Artikels öffnen." } } }, "finances": { "name": "Finanzen", "description": "Verfolgen Sie Brieftaschen, Kontostände und Transaktionen.", "links": { "walletBalances": { "name": "Brieftaschen-Kontostände", "description": "Übersicht jeder Brieftasche mit ihrem aktuellen Kontostand." }, "recordTransaction": { "name": "Transaktion aufzeichnen", "description": "Finanzen öffnen, um eine Transaktion in einer ausgewählten Brieftasche aufzuzeichnen.", "parameters": { "wallet": "Name der Brieftasche" } } } } };
const shopping$4 = { "title": "Einkaufsliste", "description": "Verfolgen Sie Artikel, die gekauft werden sollen.", "empty": "Ihre Liste ist leer. Fügen Sie Ihren ersten Artikel hinzu.", "add": { "trigger": "Artikel hinzufügen", "title": "Artikel hinzufügen", "nameLabel": "Name", "namePlaceholder": "Milch", "quantityLabel": "Menge", "quantityPlaceholder": "2", "unitLabel": "Einheit", "unitPlaceholder": "Stück, l, kg", "descriptionPlaceholder": "Marke oder Notizen (optional)" } };
const description$4 = "Beschreibung";
const add$4 = "Hinzufügen";
const study$4 = { "labels": { "upcomingExams": { "empty": "Keine Prüfungen in dieser Woche geplant." }, "dueAssignments": { "empty": "Keine fälligen Aufgaben." }, "classesToday": { "empty": "Keine Kurse heute." } }, "exams": { "title": "Prüfungen", "description": "Verfolgen Sie anstehende Prüfungen.", "empty": "Noch keine Prüfungen. Fügen Sie eine hinzu.", "add": { "trigger": "Prüfung hinzufügen", "title": "Prüfung hinzufügen", "titleLabel": "Titel", "titlePlaceholder": "Zwischenprüfung 1", "subjectLabel": "Fach", "subjectPlaceholder": "Physik", "descriptionLabel": "Notizen", "descriptionPlaceholder": "Themen, Raum, wichtige Informationen" }, "edit": { "title": "Prüfung bearbeiten", "titleLabel": "Titel", "subjectLabel": "Fach", "descriptionLabel": "Notizen" } }, "classes": { "form": { "dayPlaceholder": "Tag", "noDay": "Kein Tag" }, "title": "Kurse", "description": "Verwalten Sie Ihren Stundenplan.", "empty": "Keine Kurse für diesen Tag. Fügen Sie einen hinzu.", "add": { "trigger": "Kurs hinzufügen", "title": "Kurs hinzufügen", "subjectLabel": "Fach", "subjectPlaceholder": "Mathematik", "shortLabel": "Kurz", "shortPlaceholder": "Mathe", "teacherLabel": "Lehrer", "teacherPlaceholder": "Herr Müller", "locationLabel": "Ort", "locationPlaceholder": "Raum 101", "dayLabel": "Tag", "periodLabel": "Periode (1..)", "periodPlaceholder": "1" }, "edit": { "title": "Kurs bearbeiten", "subjectLabel": "Fach", "shortLabel": "Kurz", "teacherLabel": "Lehrer", "locationLabel": "Ort", "dayLabel": "Tag", "periodLabel": "Periode (1..)" } }, "assignments": { "title": "Aufgaben", "description": "Verfolgen Sie Aufgaben und anstehende Fristen.", "empty": "Noch keine Aufgaben. Fügen Sie eine hinzu.", "add": { "trigger": "Aufgabe hinzufügen", "title": "Aufgabe hinzufügen", "titleLabel": "Titel", "titlePlaceholder": "Kapitel 5 lesen", "subjectLabel": "Fach", "subjectPlaceholder": "Geschichte", "dueDateLabel": "Fälligkeitsdatum", "descriptionLabel": "Notizen", "descriptionPlaceholder": "Wichtige Informationen" }, "edit": { "title": "Aufgabe bearbeiten", "titleLabel": "Titel", "subjectLabel": "Fach", "dueDateLabel": "Fälligkeitsdatum", "descriptionLabel": "Notizen", "completedLabel": "Abgeschlossen", "completedHint": "Umschalten, wenn die Aufgabe erledigt ist.", "completedAria": "Aufgabenabschlussstatus" }, "item": { "markIncomplete": "Aufgabe als unvollständig markieren", "markComplete": "Aufgabe als abgeschlossen markieren" } } };
const date$4 = "Datum";
const done$4 = "Fertig";
const days$4 = { "short": { "monday": "Mo", "tuesday": "Di", "wednesday": "Mi", "thursday": "Do", "friday": "Fr", "saturday": "Sa", "sunday": "So" } };
const saveChanges$4 = "Änderungen speichern";
const close$4 = "Schließen";
const wallet$4 = "";
const deDE = {
  color: color$4,
  labels: labels$4,
  labelsLoading: labelsLoading$4,
  noLabelsAdded: noLabelsAdded$4,
  noLabels: noLabels$4,
  save: save$4,
  remove: remove$4,
  module: module$4,
  cancel: cancel$4,
  "-": "",
  icon: icon$4,
  shortcut: shortcut$4,
  finances: finances$4,
  home: home$4,
  loading: loading$4,
  settings: settings$4,
  back: back$4,
  edit: edit$4,
  modules: modules$4,
  shopping: shopping$4,
  description: description$4,
  add: add$4,
  study: study$4,
  date: date$4,
  "delete": "Löschen",
  done: done$4,
  days: days$4,
  saveChanges: saveChanges$4,
  close: close$4,
  wallet: wallet$4
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: add$4,
  back: back$4,
  cancel: cancel$4,
  close: close$4,
  color: color$4,
  date: date$4,
  days: days$4,
  default: deDE,
  description: description$4,
  done: done$4,
  edit: edit$4,
  finances: finances$4,
  home: home$4,
  icon: icon$4,
  labels: labels$4,
  labelsLoading: labelsLoading$4,
  loading: loading$4,
  module: module$4,
  modules: modules$4,
  noLabels: noLabels$4,
  noLabelsAdded: noLabelsAdded$4,
  remove: remove$4,
  save: save$4,
  saveChanges: saveChanges$4,
  settings: settings$4,
  shopping: shopping$4,
  shortcut: shortcut$4,
  study: study$4,
  wallet: wallet$4
}, Symbol.toStringTag, { value: "Module" }));
const color$3 = "Color";
const labels$3 = "Labels";
const labelsLoading$3 = "Loading labels...";
const noLabelsAdded$3 = "No labels added yet.";
const noLabels$3 = "No labels available";
const save$3 = "Save";
const remove$3 = "Remove";
const module$3 = { "edit": "Edit Module Card", "labels": { "remove": { "aria": "Remove label" }, "addAnother": "Add another label...", "add": "Add label..." } };
const cancel$3 = "Cancel";
const icon$3 = "Icon";
const shortcut$3 = { "edit": "Edit Shortcut", "card": { "aria": "Shortcut" } };
const finances$3 = { "wallet": { "overview": { "title": "Overview", "description": "Select a wallet to see its transactions and balance." }, "pick": "Pick a wallet to begin tracking transactions.", "dialog": { "title": "Record transaction", "description": "Positive amounts add to the balance, negative subtract.", "income": "Income", "expense": "Expense", "amount": "Amount", "date": "Date", "note": "Notes", "save": "Save transaction", "notePlaceholder": "Optional description" }, "currentBalance": "Current balance", "addTransaction": "Add transaction", "income": "Income", "expense": "Expense", "transactions": { "title": "Transactions", "description": "Most recent first.", "noTransactions": "No transactions recorded yet.", "delete": "Delete transaction", "noDate": "No date" }, "labels": { "balances": { "empty": "No wallets tracked yet." } }, "selector": { "title": "Wallets", "description": "Create wallets to separate budgets and savings.", "empty": "No wallets yet. Add your first wallet to get started.", "transactionSingular": "transaction", "transactionPlural": "transactions", "edit": { "aria": "Edit wallet details", "title": "Edit Wallet", "nameLabel": "Name", "delete": "Delete wallet" }, "addTrigger": "Add Wallet", "create": { "title": "New Wallet", "description": "Set a name, color, and optional description.", "nameLabel": "Name", "namePlaceholder": "Everyday spending", "descriptionPlaceholder": "Short notes", "cta": "Create wallet" } } } };
const home$3 = { "selectModule": "Select a module", "selectShortcut": "Select a shortcut", "heading": "Organized", "settings": { "aria": "Settings" }, "shortcuts": { "add": { "aria": "Add new shortcut", "title": "Add Shortcut", "iconLabel": "Icon", "colorLabel": "Color", "cta": "Add Shortcut" } }, "modules": { "add": { "trigger": "Add Module", "title": "Add Module", "cta": "Add Module" } } };
const loading$3 = "Loading...";
const settings$3 = { "language": { "selectPrompt": "Select language", "title": "Language", "description": "Choose the language Organized uses throughout the app.", "note": "Changes apply immediately and persist across sessions." }, "header": { "title": "Settings" } };
const back$3 = "Back";
const edit$3 = "Edit";
const modules$3 = { "study": { "name": "Study", "description": "Barebones study module.", "links": { "classesToday": { "name": "Classes today", "description": "List of today's classes." }, "dueAssignments": { "name": "Due assignments", "description": "Incomplete assignments sorted by due date." }, "upcomingExams": { "name": "Upcoming exams", "description": "Exams scheduled in the next week." }, "addAssignment": { "name": "Add assignment", "description": "Jump to the study module and open the add assignment dialog." }, "addExam": { "name": "Add exam", "description": "Jump to the study module and open the add exam dialog." } } }, "shopping": { "name": "Shopping", "description": "Barebones shopping module.", "links": { "list": { "name": "Shopping List", "description": "List of items to buy." }, "addItem": { "name": "Add Item", "description": "Jump to the shopping module and open the add item dialog." } } }, "finances": { "name": "Finances", "description": "Track wallets, balances, and transactions.", "links": { "walletBalances": { "name": "Wallet balances", "description": "Snapshot of each wallet with its current balance." }, "recordTransaction": { "name": "Record transaction", "description": "Open finances to record a transaction in a selected wallet.", "parameters": { "wallet": "Wallet name" } } } } };
const shopping$3 = { "title": "Shopping List", "description": "Keep track of items to buy.", "empty": "Your list is empty. Add your first item.", "add": { "trigger": "Add Item", "title": "Add Item", "nameLabel": "Name", "namePlaceholder": "Milk", "quantityLabel": "Quantity", "quantityPlaceholder": "2", "unitLabel": "Unit", "unitPlaceholder": "pcs, l, kg", "descriptionPlaceholder": "Brand or notes (optional)" } };
const description$3 = "Description";
const add$3 = "Add";
const study$3 = { "labels": { "upcomingExams": { "empty": "No exams scheduled this week." }, "dueAssignments": { "empty": "No upcoming assignments." }, "classesToday": { "empty": "No classes today." } }, "exams": { "title": "Exams", "description": "Keep track of upcoming exams.", "empty": "No exams yet. Add one.", "add": { "trigger": "Add Exam", "title": "Add Exam", "titleLabel": "Title", "titlePlaceholder": "Midterm 1", "subjectLabel": "Subject", "subjectPlaceholder": "Physics", "descriptionLabel": "Notes", "descriptionPlaceholder": "Topics, room, anything important" }, "edit": { "title": "Edit Exam", "titleLabel": "Title", "subjectLabel": "Subject", "descriptionLabel": "Notes" } }, "classes": { "form": { "dayPlaceholder": "Day", "noDay": "No day" }, "title": "Classes", "description": "Manage your class schedule.", "empty": "No classes for this day. Add one.", "add": { "trigger": "Add Class", "title": "Add Class", "subjectLabel": "Subject", "subjectPlaceholder": "Mathematics", "shortLabel": "Short", "shortPlaceholder": "Math", "teacherLabel": "Teacher", "teacherPlaceholder": "Mr. Smith", "locationLabel": "Location", "locationPlaceholder": "Room 101", "dayLabel": "Day", "periodLabel": "Period (1..)", "periodPlaceholder": "1" }, "edit": { "title": "Edit Class", "subjectLabel": "Subject", "shortLabel": "Short", "teacherLabel": "Teacher", "locationLabel": "Location", "dayLabel": "Day", "periodLabel": "Period (1..)" } }, "assignments": { "title": "Assignments", "description": "Track tasks and upcoming deadlines.", "empty": "No assignments yet. Add one.", "add": { "trigger": "Add Assignment", "title": "Add Assignment", "titleLabel": "Title", "titlePlaceholder": "Read Chapter 5", "subjectLabel": "Subject", "subjectPlaceholder": "History", "dueDateLabel": "Due Date", "descriptionLabel": "Notes", "descriptionPlaceholder": "Anything important to remember" }, "edit": { "title": "Edit Assignment", "titleLabel": "Title", "subjectLabel": "Subject", "dueDateLabel": "Due Date", "descriptionLabel": "Notes", "completedLabel": "Completed", "completedHint": "Toggle when the assignment is done.", "completedAria": "Assignment completion status" }, "item": { "markIncomplete": "Mark assignment incomplete", "markComplete": "Mark assignment complete" } } };
const date$3 = "Date";
const done$3 = "Done";
const days$3 = { "short": { "monday": "Mon", "tuesday": "Tue", "wednesday": "Wed", "thursday": "Thu", "friday": "Fri", "saturday": "Sat", "sunday": "Sun" } };
const saveChanges$3 = "Save changes";
const close$3 = "Close";
const wallet$3 = "";
const enUS = {
  "-": "",
  color: color$3,
  labels: labels$3,
  labelsLoading: labelsLoading$3,
  noLabelsAdded: noLabelsAdded$3,
  noLabels: noLabels$3,
  save: save$3,
  remove: remove$3,
  module: module$3,
  cancel: cancel$3,
  icon: icon$3,
  shortcut: shortcut$3,
  finances: finances$3,
  home: home$3,
  loading: loading$3,
  settings: settings$3,
  back: back$3,
  edit: edit$3,
  modules: modules$3,
  shopping: shopping$3,
  description: description$3,
  add: add$3,
  study: study$3,
  date: date$3,
  "delete": "Delete",
  done: done$3,
  days: days$3,
  saveChanges: saveChanges$3,
  close: close$3,
  wallet: wallet$3
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: add$3,
  back: back$3,
  cancel: cancel$3,
  close: close$3,
  color: color$3,
  date: date$3,
  days: days$3,
  default: enUS,
  description: description$3,
  done: done$3,
  edit: edit$3,
  finances: finances$3,
  home: home$3,
  icon: icon$3,
  labels: labels$3,
  labelsLoading: labelsLoading$3,
  loading: loading$3,
  module: module$3,
  modules: modules$3,
  noLabels: noLabels$3,
  noLabelsAdded: noLabelsAdded$3,
  remove: remove$3,
  save: save$3,
  saveChanges: saveChanges$3,
  settings: settings$3,
  shopping: shopping$3,
  shortcut: shortcut$3,
  study: study$3,
  wallet: wallet$3
}, Symbol.toStringTag, { value: "Module" }));
const color$2 = "Color";
const labels$2 = "Etiquetas";
const labelsLoading$2 = "Cargando etiquetas...";
const noLabelsAdded$2 = "Todavía no se han agregado etiquetas.";
const noLabels$2 = "No hay etiquetas disponibles";
const save$2 = "Guardar";
const remove$2 = "Eliminar";
const module$2 = { "edit": "Editar tarjeta de módulo", "labels": { "remove": { "aria": "Eliminar etiqueta" }, "addAnother": "Agregar otra etiqueta...", "add": "Agregar etiqueta..." } };
const cancel$2 = "Cancelar";
const icon$2 = "Icono";
const shortcut$2 = { "edit": "Editar acceso directo", "card": { "aria": "Acceso directo" } };
const finances$2 = { "wallet": { "overview": { "title": "Resumen", "description": "Seleccione una billetera para ver sus transacciones y saldo." }, "pick": "Elija una billetera para comenzar a rastrear transacciones.", "dialog": { "title": "Registrar transacción", "description": "Los montos positivos suman al saldo, los negativos restan.", "income": "Ingreso", "expense": "Gasto", "amount": "Monto", "date": "Fecha", "note": "Notas", "save": "Guardar transacción", "notePlaceholder": "Descripción opcional" }, "currentBalance": "Saldo actual", "addTransaction": "Agregar transacción", "income": "Ingreso", "expense": "Gasto", "transactions": { "title": "Transacciones", "description": "Las más recientes primero.", "noTransactions": "Aún no se han registrado transacciones.", "delete": "Eliminar transacción", "noDate": "Sin fecha" }, "labels": { "balances": { "empty": "Aún no se han rastreado carteras." } }, "selector": { "title": "Carteras", "description": "Cree carteras para separar presupuestos y ahorros.", "empty": "Aún no hay carteras. Agregue su primera cartera para comenzar.", "transactionSingular": "transacción", "transactionPlural": "transacciones", "edit": { "aria": "Editar detalles de la cartera", "title": "Editar Cartera", "nameLabel": "Nombre", "delete": "Eliminar cartera" }, "addTrigger": "Agregar Cartera", "create": { "title": "Nueva Cartera", "description": "Establezca un nombre, color y descripción opcional.", "nameLabel": "Nombre", "namePlaceholder": "Gastos diarios", "descriptionPlaceholder": "Notas cortas", "cta": "Crear cartera" } } } };
const home$2 = { "selectModule": "Seleccione un módulo", "selectShortcut": "Seleccione un acceso directo", "heading": "Organized", "settings": { "aria": "Configuración" }, "shortcuts": { "add": { "aria": "Agregar nuevo acceso directo", "title": "Agregar Acceso Directo", "iconLabel": "Icono", "colorLabel": "Color", "cta": "Agregar Acceso Directo" } }, "modules": { "add": { "trigger": "Agregar Módulo", "title": "Agregar Módulo", "cta": "Agregar Módulo" } } };
const loading$2 = "Cargando...";
const settings$2 = { "language": { "selectPrompt": "Seleccione idioma", "title": "Idioma", "description": "Elija el idioma que Organizado usa en toda la aplicación.", "note": "Los cambios se aplican de inmediato y persisten en las sesiones." }, "header": { "title": "Configuración" } };
const back$2 = "Atrás";
const edit$2 = "Editar";
const modules$2 = { "study": { "name": "Estudio", "description": "Módulo de estudio básico.", "links": { "classesToday": { "name": "Clases hoy", "description": "Lista de clases de hoy." }, "dueAssignments": { "name": "Tareas pendientes", "description": "Tareas incompletas ordenadas por fecha de vencimiento." }, "upcomingExams": { "name": "Exámenes próximos", "description": "Exámenes programados para la próxima semana." }, "addAssignment": { "name": "Agregar tarea", "description": "Ir al módulo de estudio y abrir el diálogo de agregar tarea." }, "addExam": { "name": "Agregar examen", "description": "Ir al módulo de estudio y abrir el diálogo de agregar examen." } } }, "shopping": { "name": "Compras", "description": "Módulo de compras básico.", "links": { "list": { "name": "Lista de compras", "description": "Lista de artículos para comprar." }, "addItem": { "name": "Agregar artículo", "description": "Ir al módulo de compras y abrir el diálogo de agregar artículo." } } }, "finances": { "name": "Finanzas", "description": "Rastrear carteras, saldos y transacciones.", "links": { "walletBalances": { "name": "Saldos de carteras", "description": "Instantánea de cada cartera con su saldo actual." }, "recordTransaction": { "name": "Registrar transacción", "description": "Abrir finanzas para registrar una transacción en una billetera seleccionada.", "parameters": { "wallet": "Nombre de la billetera" } } } } };
const shopping$2 = { "title": "Lista de Compras", "description": "Mantenga un registro de los artículos para comprar.", "empty": "Su lista está vacía. Agregue su primer artículo.", "add": { "trigger": "Agregar Artículo", "title": "Agregar Artículo", "nameLabel": "Nombre", "namePlaceholder": "Leche", "quantityLabel": "Cantidad", "quantityPlaceholder": "2", "unitLabel": "Unidad", "unitPlaceholder": "pcs, l, kg", "descriptionPlaceholder": "Marca o notas (opcional)" } };
const description$2 = "Descripción";
const add$2 = "Agregar";
const study$2 = { "labels": { "upcomingExams": { "empty": "No hay exámenes programados para esta semana." }, "dueAssignments": { "empty": "No hay tareas pendientes." }, "classesToday": { "empty": "No hay clases hoy." } }, "exams": { "title": "Exámenes", "description": "Mantenga un registro de los exámenes próximos.", "empty": "Aún no hay exámenes. Agregue uno.", "add": { "trigger": "Agregar Examen", "title": "Agregar Examen", "titleLabel": "Título", "titlePlaceholder": "Parcial 1", "subjectLabel": "Asignatura", "subjectPlaceholder": "Física", "descriptionLabel": "Notas", "descriptionPlaceholder": "Temas, sala, cualquier cosa importante" }, "edit": { "title": "Editar Examen", "titleLabel": "Título", "subjectLabel": "Asignatura", "descriptionLabel": "Notas" } }, "classes": { "form": { "dayPlaceholder": "Día", "noDay": "Sin día" }, "title": "Clases", "description": "Administre su horario de clases.", "empty": "No hay clases para este día. Agregue una.", "add": { "trigger": "Agregar Clase", "title": "Agregar Clase", "subjectLabel": "Asignatura", "subjectPlaceholder": "Matemáticas", "shortLabel": "Corto", "shortPlaceholder": "Matemáticas", "teacherLabel": "Profesor", "teacherPlaceholder": "Sr. Smith", "locationLabel": "Ubicación", "locationPlaceholder": "Sala 101", "dayLabel": "Día", "periodLabel": "Período (1..)", "periodPlaceholder": "1" }, "edit": { "title": "Editar Clase", "subjectLabel": "Asignatura", "shortLabel": "Corto", "teacherLabel": "Profesor", "locationLabel": "Ubicación", "dayLabel": "Día", "periodLabel": "Período (1..)" } }, "assignments": { "title": "Tareas", "description": "Rastrear tareas y plazos próximos.", "empty": "Aún no hay tareas. Agregue una.", "add": { "trigger": "Agregar Tarea", "title": "Agregar Tarea", "titleLabel": "Título", "titlePlaceholder": "Leer Capítulo 5", "subjectLabel": "Asignatura", "subjectPlaceholder": "Historia", "dueDateLabel": "Fecha de vencimiento", "descriptionLabel": "Notas", "descriptionPlaceholder": "Cualquier cosa importante para recordar" }, "edit": { "title": "Editar Tarea", "titleLabel": "Título", "subjectLabel": "Asignatura", "dueDateLabel": "Fecha de vencimiento", "descriptionLabel": "Notas", "completedLabel": "Completada", "completedHint": "Marque cuando la tarea esté hecha.", "completedAria": "Estado de finalización de la tarea" }, "item": { "markIncomplete": "Marcar tarea como incompleta", "markComplete": "Marcar tarea como completa" } } };
const date$2 = "Fecha";
const done$2 = "Hecho";
const days$2 = { "short": { "monday": "Lun", "tuesday": "Mar", "wednesday": "Mié", "thursday": "Jue", "friday": "Vie", "saturday": "Sáb", "sunday": "Dom" } };
const saveChanges$2 = "Guardar cambios";
const close$2 = "Cerrar";
const wallet$2 = "";
const esES = {
  color: color$2,
  labels: labels$2,
  labelsLoading: labelsLoading$2,
  noLabelsAdded: noLabelsAdded$2,
  noLabels: noLabels$2,
  save: save$2,
  remove: remove$2,
  module: module$2,
  cancel: cancel$2,
  "-": "",
  icon: icon$2,
  shortcut: shortcut$2,
  finances: finances$2,
  home: home$2,
  loading: loading$2,
  settings: settings$2,
  back: back$2,
  edit: edit$2,
  modules: modules$2,
  shopping: shopping$2,
  description: description$2,
  add: add$2,
  study: study$2,
  date: date$2,
  "delete": "Eliminar",
  done: done$2,
  days: days$2,
  saveChanges: saveChanges$2,
  close: close$2,
  wallet: wallet$2
};
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: add$2,
  back: back$2,
  cancel: cancel$2,
  close: close$2,
  color: color$2,
  date: date$2,
  days: days$2,
  default: esES,
  description: description$2,
  done: done$2,
  edit: edit$2,
  finances: finances$2,
  home: home$2,
  icon: icon$2,
  labels: labels$2,
  labelsLoading: labelsLoading$2,
  loading: loading$2,
  module: module$2,
  modules: modules$2,
  noLabels: noLabels$2,
  noLabelsAdded: noLabelsAdded$2,
  remove: remove$2,
  save: save$2,
  saveChanges: saveChanges$2,
  settings: settings$2,
  shopping: shopping$2,
  shortcut: shortcut$2,
  study: study$2,
  wallet: wallet$2
}, Symbol.toStringTag, { value: "Module" }));
const color$1 = "Couleur";
const labels$1 = "Étiquettes";
const labelsLoading$1 = "Chargement des étiquettes...";
const noLabelsAdded$1 = "Aucune étiquette ajoutée pour le moment.";
const noLabels$1 = "Aucune étiquette disponible";
const save$1 = "Enregistrer";
const remove$1 = "Supprimer";
const module$1 = { "edit": "Éditer la carte de module", "labels": { "remove": { "aria": "Supprimer l'étiquette" }, "addAnother": "Ajouter une autre étiquette...", "add": "Ajouter une étiquette..." } };
const cancel$1 = "Annuler";
const icon$1 = "Icône";
const shortcut$1 = { "edit": "Modifier le raccourci", "card": { "aria": "Raccourci" } };
const finances$1 = { "wallet": { "overview": { "title": "Aperçu", "description": "Sélectionnez un portefeuille pour voir ses transactions et son solde." }, "pick": "Choisissez un portefeuille pour commencer à suivre les transactions.", "dialog": { "title": "Enregistrer une transaction", "description": "Les montants positifs ajoutent au solde, les négatifs soustraient.", "income": "Revenu", "expense": "Dépense", "amount": "Montant", "date": "Date", "note": "Remarques", "save": "Enregistrer la transaction", "notePlaceholder": "Description facultative" }, "currentBalance": "Solde actuel", "addTransaction": "Ajouter une transaction", "income": "Revenu", "expense": "Dépense", "transactions": { "title": "Transactions", "description": "Les plus récentes en premier.", "noTransactions": "Aucune transaction enregistrée pour le moment.", "delete": "Supprimer la transaction", "noDate": "Pas de date" }, "labels": { "balances": { "empty": "Aucun portefeuille suivi pour le moment." } }, "selector": { "title": "Portefeuilles", "description": "Créez des portefeuilles pour séparer les budgets et les économies.", "empty": "Aucun portefeuille pour le moment. Ajoutez votre premier portefeuille pour commencer.", "transactionSingular": "transaction", "transactionPlural": "transactions", "edit": { "aria": "Modifier les détails du portefeuille", "title": "Modifier le portefeuille", "nameLabel": "Nom", "delete": "Supprimer le portefeuille" }, "addTrigger": "Ajouter un portefeuille", "create": { "title": "Nouveau portefeuille", "description": "Définissez un nom, une couleur et une description facultative.", "nameLabel": "Nom", "namePlaceholder": "Dépenses quotidiennes", "descriptionPlaceholder": "Notes courtes", "cta": "Créer un portefeuille" } } } };
const home$1 = { "selectModule": "Sélectionner un module", "selectShortcut": "Sélectionner un raccourci", "heading": "Organized", "settings": { "aria": "Paramètres" }, "shortcuts": { "add": { "aria": "Ajouter un nouveau raccourci", "title": "Ajouter un raccourci", "iconLabel": "Icône", "colorLabel": "Couleur", "cta": "Ajouter un raccourci" } }, "modules": { "add": { "trigger": "Ajouter un module", "title": "Ajouter un module", "cta": "Ajouter un module" } } };
const loading$1 = "Chargement...";
const settings$1 = { "language": { "selectPrompt": "Sélectionner la langue", "title": "Langue", "description": "Choisissez la langue utilisée par Organisé dans l'application.", "note": "Les modifications s'appliquent immédiatement et persistent entre les sessions." }, "header": { "title": "Paramètres" } };
const back$1 = "Retour";
const edit$1 = "Modifier";
const modules$1 = { "study": { "name": "Étude", "description": "Module d'étude de base.", "links": { "classesToday": { "name": "Cours aujourd'hui", "description": "Liste des cours d'aujourd'hui." }, "dueAssignments": { "name": "Devoirs à rendre", "description": "Devoirs incomplets triés par date d'échéance." }, "upcomingExams": { "name": "Examens à venir", "description": "Examens prévus dans la semaine prochaine." }, "addAssignment": { "name": "Ajouter un devoir", "description": "Aller au module d'étude et ouvrir la boîte de dialogue d'ajout de devoir." }, "addExam": { "name": "Ajouter un examen", "description": "Aller au module d'étude et ouvrir la boîte de dialogue d'ajout d'examen." } } }, "shopping": { "name": "Achats", "description": "Module d'achats de base.", "links": { "list": { "name": "Liste d'achats", "description": "Liste d'articles à acheter." }, "addItem": { "name": "Ajouter un article", "description": "Aller au module d'achats et ouvrir la boîte de dialogue d'ajout d'article." } } }, "finances": { "name": "Finances", "description": "Suivez les portefeuilles, les soldes et les transactions.", "links": { "walletBalances": { "name": "Soldes des portefeuilles", "description": "Instantané de chaque portefeuille avec son solde actuel." }, "recordTransaction": { "name": "Enregistrer une transaction", "description": "Ouvrir les finances pour enregistrer une transaction dans un portefeuille sélectionné.", "parameters": { "wallet": "Nom du portefeuille" } } } } };
const shopping$1 = { "title": "Liste d'achats", "description": "Gardez une trace des articles à acheter.", "empty": "Votre liste est vide. Ajoutez votre premier article.", "add": { "trigger": "Ajouter un article", "title": "Ajouter un article", "nameLabel": "Nom", "namePlaceholder": "Lait", "quantityLabel": "Quantité", "quantityPlaceholder": "2", "unitLabel": "Unité", "unitPlaceholder": "pcs, l, kg", "descriptionPlaceholder": "Marque ou notes (facultatif)" } };
const description$1 = "Description";
const add$1 = "Ajouter";
const study$1 = { "labels": { "upcomingExams": { "empty": "Aucun examen prévu cette semaine." }, "dueAssignments": { "empty": "Aucun devoir à rendre." }, "classesToday": { "empty": "Aucun cours aujourd'hui." } }, "exams": { "title": "Examens", "description": "Gardez une trace des examens à venir.", "empty": "Aucun examen pour le moment. Ajoutez-en un.", "add": { "trigger": "Ajouter un examen", "title": "Ajouter un examen", "titleLabel": "Titre", "titlePlaceholder": "Interrogation 1", "subjectLabel": "Matière", "subjectPlaceholder": "Physique", "descriptionLabel": "Notes", "descriptionPlaceholder": "Sujets, salle, tout ce qui est important" }, "edit": { "title": "Modifier l'examen", "titleLabel": "Titre", "subjectLabel": "Matière", "descriptionLabel": "Notes" } }, "classes": { "form": { "dayPlaceholder": "Jour", "noDay": "Aucun jour" }, "title": "Cours", "description": "Gérez votre emploi du temps.", "empty": "Aucun cours pour ce jour. Ajoutez-en un.", "add": { "trigger": "Ajouter un cours", "title": "Ajouter un cours", "subjectLabel": "Matière", "subjectPlaceholder": "Mathématiques", "shortLabel": "Court", "shortPlaceholder": "Maths", "teacherLabel": "Enseignant", "teacherPlaceholder": "M. Smith", "locationLabel": "Lieu", "locationPlaceholder": "Salle 101", "dayLabel": "Jour", "periodLabel": "Période (1..)", "periodPlaceholder": "1" }, "edit": { "title": "Modifier le cours", "subjectLabel": "Matière", "shortLabel": "Court", "teacherLabel": "Enseignant", "locationLabel": "Lieu", "dayLabel": "Jour", "periodLabel": "Période (1..)" } }, "assignments": { "title": "Devoirs", "description": "Suivez les tâches et les échéances à venir.", "empty": "Aucun devoir pour le moment. Ajoutez-en un.", "add": { "trigger": "Ajouter un devoir", "title": "Ajouter un devoir", "titleLabel": "Titre", "titlePlaceholder": "Lire le chapitre 5", "subjectLabel": "Matière", "subjectPlaceholder": "Histoire", "dueDateLabel": "Date d'échéance", "descriptionLabel": "Notes", "descriptionPlaceholder": "Tout ce qui est important à retenir" }, "edit": { "title": "Modifier le devoir", "titleLabel": "Titre", "subjectLabel": "Matière", "dueDateLabel": "Date d'échéance", "descriptionLabel": "Notes", "completedLabel": "Terminé", "completedHint": "Cochez lorsque le devoir est terminé.", "completedAria": "État d'achèvement du devoir" }, "item": { "markIncomplete": "Marquer le devoir comme non terminé", "markComplete": "Marquer le devoir comme terminé" } } };
const date$1 = "Date";
const done$1 = "Terminé";
const days$1 = { "short": { "monday": "Lun", "tuesday": "Mar", "wednesday": "Mer", "thursday": "Jeu", "friday": "Ven", "saturday": "Sam", "sunday": "Dim" } };
const saveChanges$1 = "Enregistrer les modifications";
const close$1 = "Fermer";
const wallet$1 = "";
const frFR = {
  color: color$1,
  labels: labels$1,
  labelsLoading: labelsLoading$1,
  noLabelsAdded: noLabelsAdded$1,
  noLabels: noLabels$1,
  save: save$1,
  remove: remove$1,
  module: module$1,
  cancel: cancel$1,
  "-": "",
  icon: icon$1,
  shortcut: shortcut$1,
  finances: finances$1,
  home: home$1,
  loading: loading$1,
  settings: settings$1,
  back: back$1,
  edit: edit$1,
  modules: modules$1,
  shopping: shopping$1,
  description: description$1,
  add: add$1,
  study: study$1,
  date: date$1,
  "delete": "Supprimer",
  done: done$1,
  days: days$1,
  saveChanges: saveChanges$1,
  close: close$1,
  wallet: wallet$1
};
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: add$1,
  back: back$1,
  cancel: cancel$1,
  close: close$1,
  color: color$1,
  date: date$1,
  days: days$1,
  default: frFR,
  description: description$1,
  done: done$1,
  edit: edit$1,
  finances: finances$1,
  home: home$1,
  icon: icon$1,
  labels: labels$1,
  labelsLoading: labelsLoading$1,
  loading: loading$1,
  module: module$1,
  modules: modules$1,
  noLabels: noLabels$1,
  noLabelsAdded: noLabelsAdded$1,
  remove: remove$1,
  save: save$1,
  saveChanges: saveChanges$1,
  settings: settings$1,
  shopping: shopping$1,
  shortcut: shortcut$1,
  study: study$1,
  wallet: wallet$1
}, Symbol.toStringTag, { value: "Module" }));
const color = "Szín";
const labels = "Címkék";
const labelsLoading = "Címkék betöltése...";
const noLabelsAdded = "Még nem adtál hozzá címkéket.";
const noLabels = "Nincsenek elérhető címkék";
const save = "Mentés";
const remove = "Eltávolítás";
const module = { "edit": "Modulkártya szerkesztése", "labels": { "remove": { "aria": "Címke eltávolítása" }, "addAnother": "Új címke hozzáadása...", "add": "Címke hozzáadása..." } };
const cancel = "Mégse";
const icon = "Ikon";
const shortcut = { "edit": "Gyorsbillentyű szerkesztése", "card": { "aria": "Parancsikon" } };
const finances = { "wallet": { "overview": { "title": "Áttekintés", "description": "Válasszon pénztárcát a tranzakciók és egyenleg megtekintéséhez." }, "pick": "Válasszon pénztárcát a tranzakciók nyomon követéséhez.", "dialog": { "title": "Tranzakció rögzítése", "description": "A pozitív összegek növelik, a negatív összegek csökkentik az egyenleget.", "income": "Bevétel", "expense": "Kiadás", "amount": "Összeg", "date": "Dátum", "note": "Megjegyzések", "save": "Tranzakció mentése", "notePlaceholder": "Opcionális leírás" }, "currentBalance": "Jelenlegi egyenleg", "addTransaction": "Tranzakció hozzáadása", "income": "Bevétel", "expense": "Kiadás", "transactions": { "title": "Tranzakciók", "description": "Legfrissebbek először.", "noTransactions": "Még nincsenek tranzakciók.", "delete": "Tranzakció törlése", "noDate": "Nincs dátum" }, "labels": { "balances": { "empty": "Még nincsenek pénztárcák." } }, "selector": { "title": "Pénztárcák", "description": "Hozzon létre pénztárcákat a költségvetések és megtakarítások elkülönítéséhez.", "empty": "Még nincsenek pénztárcák. Kezdje az első pénztárca hozzáadásával.", "transactionSingular": "tranzakció", "transactionPlural": "tranzakciók", "edit": { "aria": "Pénztárca adatainak szerkesztése", "title": "Pénztárca szerkesztése", "nameLabel": "Név", "delete": "Pénztárca törlése" }, "addTrigger": "Pénztárca hozzáadása", "create": { "title": "Új pénztárca", "description": "Állítson be nevet, színt és opcionális leírást.", "nameLabel": "Név", "namePlaceholder": "Mindennapi kiadások", "descriptionPlaceholder": "Rövid jegyzetek", "cta": "Pénztárca létrehozása" } } } };
const ui = { "home": { "title": "Kezdőlap" } };
const home = { "selectModule": "Modul kiválasztása", "selectShortcut": "Parancsikon kiválasztása", "heading": "Organized", "settings": { "aria": "Beállítások" }, "shortcuts": { "add": { "aria": "Új parancsikon hozzáadása", "title": "Parancsikon hozzáadása", "iconLabel": "Ikon", "colorLabel": "Szín", "cta": "Parancsikon hozzáadása" } }, "modules": { "add": { "trigger": "Modul hozzáadása", "title": "Modul hozzáadása", "cta": "Modul hozzáadása" } } };
const loading = "Betöltés...";
const settings = { "language": { "selectPrompt": "Nyelv kiválasztása", "title": "Nyelv", "description": "Válassza ki a szervezett alkalmazás nyelvét.", "note": "A változtatások azonnal érvénybe lépnek és megmaradnak a munkamenetek között." }, "header": { "title": "Beállítások" } };
const back = "Vissza";
const edit = "Szerkesztés";
const modules = { "study": { "name": "Tanulmányok", "description": "Alap tanulmányok modul.", "links": { "classesToday": { "name": "Mai órák", "description": "Mai órák listája." }, "dueAssignments": { "name": "Határidős feladatok", "description": "Befejezetlen feladatok határidő szerint rendezve." }, "upcomingExams": { "name": "Közelgő vizsgák", "description": "Vizsgák a következő héten." }, "addAssignment": { "name": "Feladat hozzáadása", "description": "Ugrás a tanulmányok modulhoz és a feladat hozzáadása párbeszédpanel megnyitása." }, "addExam": { "name": "Vizsga hozzáadása", "description": "Ugrás a tanulmányok modulhoz és a vizsga hozzáadása párbeszédpanel megnyitása." } } }, "shopping": { "name": "Bevásárlás", "description": "Alap bevásárlás modul.", "links": { "list": { "name": "Bevásárlólista", "description": "Vásárolandó tételek listája." }, "addItem": { "name": "Elem hozzáadása", "description": "Ugrás a bevásárlás modulhoz és az elem hozzáadása párbeszédpanel megnyitása." } } }, "finances": { "name": "Pénzügyek", "description": "Pénztárcák, egyenlegek és tranzakciók nyomon követése.", "links": { "walletBalances": { "name": "Pénztárca egyenlegek", "description": "Pénztárcák pillanatnyi egyenlege." }, "recordTransaction": { "name": "Tranzakció rögzítése", "description": "Pénzügyek megnyitása egy kiválasztott pénztárcában történő tranzakció rögzítéséhez.", "parameters": { "wallet": "Pénztárca neve" } } } } };
const shopping = { "title": "Bevásárlólista", "description": "Tartsa nyilván a megvásárolandó tételeket.", "empty": "A lista üres. Adja hozzá az első elemet.", "add": { "trigger": "Elem hozzáadása", "title": "Elem hozzáadása", "nameLabel": "Név", "namePlaceholder": "Tej", "quantityLabel": "Mennyiség", "quantityPlaceholder": "2", "unitLabel": "Mértékegység", "unitPlaceholder": "db, l, kg", "descriptionPlaceholder": "Márka vagy jegyzetek (opcionális)" } };
const description = "Leírás";
const add = "Hozzáadás";
const study = { "labels": { "upcomingExams": { "empty": "Nincsenek vizsgák ezen a héten." }, "dueAssignments": { "empty": "Nincsenek határidős feladatok." }, "classesToday": { "empty": "Nincsenek mai órák." } }, "exams": { "title": "Vizsgák", "description": "Közelgő vizsgák nyomon követése.", "empty": "Még nincsenek vizsgák. Adjon hozzá egyet.", "add": { "trigger": "Vizsga hozzáadása", "title": "Vizsga hozzáadása", "titleLabel": "Cím", "titlePlaceholder": "Első vizsga", "subjectLabel": "Tantárgy", "subjectPlaceholder": "Fizika", "descriptionLabel": "Jegyzetek", "descriptionPlaceholder": "Témák, terem, bármi fontos" }, "edit": { "title": "Vizsga szerkesztése", "titleLabel": "Cím", "subjectLabel": "Tantárgy", "descriptionLabel": "Jegyzetek" } }, "classes": { "form": { "dayPlaceholder": "Nap", "noDay": "Nincs nap" }, "title": "Órák", "description": "Órarend kezelése.", "empty": "Nincsenek órák ezen a napon. Adjon hozzá egyet.", "add": { "trigger": "Óra hozzáadása", "title": "Óra hozzáadása", "subjectLabel": "Tantárgy", "subjectPlaceholder": "Matematika", "shortLabel": "Rövid", "shortPlaceholder": "Mate", "teacherLabel": "Tanár", "teacherPlaceholder": "Kovács tanár úr", "locationLabel": "Helyszín", "locationPlaceholder": "101-es terem", "dayLabel": "Nap", "periodLabel": "Időszak (1..)", "periodPlaceholder": "1" }, "edit": { "title": "Óra szerkesztése", "subjectLabel": "Tantárgy", "shortLabel": "Rövid", "teacherLabel": "Tanár", "locationLabel": "Helyszín", "dayLabel": "Nap", "periodLabel": "Időszak (1..)" } }, "assignments": { "title": "Feladatok", "description": "Feladatok és határidők nyomon követése.", "empty": "Még nincsenek feladatok. Adjon hozzá egyet.", "add": { "trigger": "Feladat hozzáadása", "title": "Feladat hozzáadása", "titleLabel": "Cím", "titlePlaceholder": "5. fejezet olvasása", "subjectLabel": "Tantárgy", "subjectPlaceholder": "Történelem", "dueDateLabel": "Határidő", "descriptionLabel": "Jegyzetek", "descriptionPlaceholder": "Bármi fontos" }, "edit": { "title": "Feladat szerkesztése", "titleLabel": "Cím", "subjectLabel": "Tantárgy", "dueDateLabel": "Határidő", "descriptionLabel": "Jegyzetek", "completedLabel": "Befejezve", "completedHint": "Kapcsolja be, ha a feladat kész.", "completedAria": "Feladat befejezési állapota" }, "item": { "markIncomplete": "Feladat visszaminősítése befejezetlenre", "markComplete": "Feladat megjelölése befejezettként" } } };
const date = "Dátum";
const done = "Kész";
const days = { "short": { "monday": "H", "tuesday": "K", "wednesday": "Sze", "thursday": "Cs", "friday": "P", "saturday": "Szo", "sunday": "V" } };
const saveChanges = "Változtatások mentése";
const close = "Bezárás";
const wallet = "";
const huHU = {
  color,
  labels,
  labelsLoading,
  noLabelsAdded,
  noLabels,
  save,
  remove,
  module,
  cancel,
  "-": "",
  icon,
  shortcut,
  finances,
  ui,
  home,
  loading,
  settings,
  back,
  edit,
  modules,
  shopping,
  description,
  add,
  study,
  date,
  "delete": "Törlés",
  done,
  days,
  saveChanges,
  close,
  wallet
};
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add,
  back,
  cancel,
  close,
  color,
  date,
  days,
  default: huHU,
  description,
  done,
  edit,
  finances,
  home,
  icon,
  labels,
  labelsLoading,
  loading,
  module,
  modules,
  noLabels,
  noLabelsAdded,
  remove,
  save,
  saveChanges,
  settings,
  shopping,
  shortcut,
  study,
  ui,
  wallet
}, Symbol.toStringTag, { value: "Module" }));
const state = { locale: "en-US", locales: [] };
const i18n = {
  get locale() {
    return state.locale;
  },
  /**
   * Sets the locale and updates i18next and localStorage.
   * @param locale The locale to set.
   */
  set locale(locale) {
    state.locale = locale;
    localStorage.setItem("locale", locale);
  },
  /**
   * The available locales.
   */
  get locales() {
    return state.locales;
  }
};
function t(key, fallback) {
  return i18next.t(key, { defaultValue: fallback, lng: state.locale });
}
function initI18n() {
  const resources = {};
  const localeModules = /* @__PURE__ */ Object.assign({
    "./locales/de-DE.json": __vite_glob_0_0,
    "./locales/en-US.json": __vite_glob_0_1,
    "./locales/es-ES.json": __vite_glob_0_2,
    "./locales/fr-FR.json": __vite_glob_0_3,
    "./locales/hu-HU.json": __vite_glob_0_4
  });
  for (const path in localeModules) {
    const localeKey = path.match(/([\w-]+)\.json$/)?.[1];
    if (localeKey) {
      const module2 = localeModules[path];
      resources[localeKey] = { translation: module2.default };
      state.locales.push(localeKey);
    }
  }
  const storedLocale = localStorage.getItem("locale");
  if (storedLocale && state.locales.includes(storedLocale)) state.locale = storedLocale;
  i18next.init({ lng: state.locale, debug: false, resources });
}
export {
  initI18n as a,
  i18n as i,
  t
};
