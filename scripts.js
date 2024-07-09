
//  se ejecute solo cuando todos los elementos del DOM están disponibles.
document.addEventListener('DOMContentLoaded', () =>{
   
    // getElementById sirve para obtener entrada de texto con el id
    const noteInput = document.getElementById('noteContent');
    const addNoteButton = document.getElementById('addNoteButton');
    
    //querySelector  obtiene del contenedor lo que necesitas
    const notesContainer = document.querySelector('.container');

    // Función para cargar las notas desde el localStorage
    const loadNotes = () => {
        // si no tiene notas carga un array vacio  y si  tiene llama a render para cargarlas al interfaz
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        renderNotes(notes);
    };

      // Función para renderizar las notas
      const renderNotes = (notes) => {
        // Remover todas las notas previas
        const existingNotes = document.querySelectorAll('.note');
        existingNotes.forEach(note => note.remove());

        // Crear elementos de notas y agregarlos al contenedor
        notes.forEach((note, index) => {
            const noteElement = createNoteElement(note, index);
            notesContainer.appendChild(noteElement);
        });
    };



     // Función para crear un elemento de nota
     const createNoteElement = (note, index) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteText = document.createElement('span');
        noteText.textContent = note;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Borrar';
        deleteButton.addEventListener('click', () => {
            deleteNote(index);
        });

        noteDiv.appendChild(noteText);
        noteDiv.appendChild(deleteButton);

        return noteDiv;
    };

     // Función para añadir una nueva nota
     const addNote = () => {
         // Obtener el texto de la nota del input y eliminar espacios en blanco al inicio y al final
        const noteText = noteInput.value.trim();
        // Verificar que el texto de la nota no esté vacío
        if (noteText) {
            // Obtener las notas existentes desde el localStorage o inicializar un array vacío si no hay notas guardadas
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            // Agregar la nueva nota al array de notas
            notes.push(noteText);
            // Guardar el array actualizado de notas en el localStorage, convirtiéndolo a formato JSON
            localStorage.setItem('notes', JSON.stringify(notes));
              // Limpiar el campo de entrada de texto de la nota después de agregarla
            noteInput.value = '';
              // Renderizar todas las notas, incluyendo la nueva, en la interfaz de usuario
            renderNotes(notes);
        }
    };

    // Función para eliminar una nota
    //Esta función elimina una nota del localStorage utilizando el índice proporcionado. 
    const deleteNote = (index) => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        // Después de eliminar el elemento del array notes, se actualiza el localStorage con el nuevo array notes
        localStorage.setItem('notes', JSON.stringify(notes));
        renderNotes(notes);
    };

    // Cargar las notas cuando se carga la página
    loadNotes();

    // Event listener para el botón de añadir nota
    addNoteButton.addEventListener('click', addNote)

})