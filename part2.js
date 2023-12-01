function funcionEjemplo(x) {
    // Define aquí tu propia función, por ejemplo, x^3 - 2x^2 + 4x - 8
    return Math.pow(x, 3) - 2 * Math.pow(x, 2) + 4 * x - 8;
}

const math = require('mathjs');

function evaluarFuncion(funcion, x) {
    try {
        const scope = { x: x };
        const result = math.evaluate(funcion, scope);
        return result;
    } catch (error) {
        throw new Error("Error al evaluar la función: " + error.message);
    }
}

function metodoBiseccion(funcion, a, b, errorAproximado) {
    const iteraciones = [];

    if (evaluarFuncion(funcion, a) * evaluarFuncion(funcion, b) >= 0) {
        throw new Error("La función no cumple con el teorema del valor intermedio en el intervalo dado.");
    }

    while ((b - a) / 2.0 > errorAproximado) {
        const c = (a + b) / 2.0;
        iteraciones.push({ a, b, c, fc: evaluarFuncion(funcion, c) });

        if (evaluarFuncion(funcion, c) === 0.0) {
            break;
        } else if (evaluarFuncion(funcion, c) * evaluarFuncion(funcion, a) < 0) {
            b = c;
        } else {
            a = c;
        }
    }

    return iteraciones;
}

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Solicita los datos por consola
rl.question("Introduce la ecuación (en términos de 'x'): ", (ecuacion) => {
    rl.question("Introduce el límite inferior (a): ", (limiteA) => {
        rl.question("Introduce el límite superior (b): ", (limiteB) => {
            rl.question("Introduce el error aproximado (porcentaje): ", (errorAproximado) => {
                const a = parseFloat(limiteA);
                const b = parseFloat(limiteB);
                const error = parseFloat(errorAproximado) / 100;

                try {
                    const iteraciones = metodoBiseccion(ecuacion, a, b, error);

                    // Imprime la tabla de iteraciones
                    console.log("\nIteraciones:");
                    console.log("Límite a\tLímite b\tRaíz (c)\tf(c)");
                    for (const { a, b, c, fc } of iteraciones) {
                        console.log(`${a.toFixed(6)}\t${b.toFixed(6)}\t${c.toFixed(6)}\t${fc.toFixed(6)}`);
                    }

                    // Imprime la raíz aproximada
                    const raizAproximada = (iteraciones[iteraciones.length - 1].a + iteraciones[iteraciones.length - 1].b) / 2.0;
                    console.log("\nRaíz aproximada:", raizAproximada.toFixed(6));
                } catch (e) {
                    console.error(e.message);
                } finally {
                    rl.close();
                }
            });
        });
    });
});
