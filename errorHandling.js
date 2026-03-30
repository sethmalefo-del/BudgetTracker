(() => {
    // WITH ERROR HANDLING - the fix
    function parseInput(json) {
        try {
            const data = JSON.parse(json);
            console.log('User:', data.name);
            return data;
        } catch (error) {
            console.error('Invalid JSON:', error.message);
            return null;
        } finally {
            // Runs whether parsing succeeds or fails.
            console.log('parseInput() done');
        }
    }

    // FOUR COMMON ERROR TYPES
    try {
        console.log(x);
    } catch (error) {
        console.log(error.name, error.message);
    }

    try {
        null.logString();
    } catch (error) {
        console.log(error.name, error.message);
    }

    try {
        new Array(-1);
    } catch (error) {
        console.log(error.name, error.message);
    }

    try {
        JSON.parse('{bad}');
    } catch (error) {
        console.log(error.name, error.message);
    }

    // Custom error class
    class ValidationError extends Error {
        constructor(message, field) {
            super(message);
            this.name = 'ValidationError';
            this.field = field;
        }
    }

    function validateAge(age) {
        if (typeof age !== 'number' || age < 0 || age > 120) {
            throw new ValidationError('Age must be 0-120', 'age');
        }

        return age;
    }

    try {
        validateAge(-5);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(`Field '${error.field}' failed: ${error.message}`);
        } else {
            console.log('Unexpected error', error.message);
        }
    }
})();
