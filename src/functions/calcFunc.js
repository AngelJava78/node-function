const { app } = require('@azure/functions');

app.http('calcFunc', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        const a = parseFloat(request.query.get('a'));
        const b = parseFloat(request.query.get('b'));

        if (isNaN(a) || isNaN(b)) {
            return {
                status: 400,
                body: 'Los parámetros "a" y "b" deben ser números válidos.'
            };
        }

        const c = a + b;
        const d = a * b;
        const result = `${a} + ${b} = ${c}`;
        result += `, ${a} * ${b} = ${d}`;
        return {
            body: result
        };
    }
});

