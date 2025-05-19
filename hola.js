//Representa un elemento individual en la pila
class Node {
    constructor(value) {
        this.value = value; //Almacena el valor
        this.next = null; //Referencia al siguiente nodo que se creara
    }
    //Al utilizarce ejemplo: Node(3) = 3 y next sera null
}

//Pila
class Stack {
    constructor() {
        this.top = null; //Pila vacia
    }
    //Insertamos un elemento en la parte superior de la pila
    push(value) {
        const newNode = new Node(value);
        newNode.next = this.top; //Al crear un nuevo nodo este apuntara al top para reemplazar al antiguo
        this.top = newNode; //Nuevo nodo se convierte en top
    }
// Elimina y devuelve el elemento superior de la pila
    pop() {
        if (this.top === null) return null; //Retornamos null si la pila esta vacia
        const value = this.top.value; 
        this.top = this.top.next; //Convierte al siguiente nodo el top
        return value;
    }
//Verificacion de pila
    isEmpty() {
        return this.top === null;
    }
// Devuelve un array con los elementos de la pila
    getElements() {
        let elements = [];
        let current = this.top;
        while (current !== null) {
            elements.push(current.value);
            current = current.next;
        }
        return elements;
    }
}

function convertDecimal(decimalNumber, base) {
    const stack = new Stack();
    let number = decimalNumber;

    if (number === 0) {
        stack.push(0);
    } else {
        while (number > 0) {
            const remainder = number % base; //Calcula el residuo
            stack.push(remainder); //Guarda el residuo en la pila
            number = Math.floor(number / base); //Actualizamos el numero
        }
    }

    return stack; //Retornamos con la pila 
}
 //Para hexadecimal
function getDigit(value, base) {
    if (base === 16 && value >= 10) {
        // Convierte números 10-15 a letras A-F
        return String.fromCharCode(65 + (value - 10));
    }
    return value.toString(); // Para bases 2 y 8, devuelve el número como string
}

function convert(base) {
    const input = document.getElementById('decimalInput');
    const resultElement = document.getElementById('result');
    const stackElement = document.getElementById('stackState');
    
    const decimalNumber = parseInt(input.value, 10);

    // Validaciones
    if (isNaN(decimalNumber)) {
        alert("Error: Ingresa un número válido");
        return;
    }
    
    if (decimalNumber < 0) {
        alert("Error: Solo números positivos");
        return;
    }

    // Proceso de conversión
    const stack = convertDecimal(decimalNumber, base);
    const elements = stack.getElements();
    
    // Mostrar estado de la pila
    stackElement.innerHTML = `Estado de la pila: [${elements.map(e => getDigit(e, base)).join(', ')}]`;
    
    // Mostrar resultado
    resultElement.innerHTML = `Base ${base}: ${elements.map(e => getDigit(e, base)).join('')}`;
}