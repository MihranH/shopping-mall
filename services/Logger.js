class Logger {
    static info(message) {
        console.log('Info:', message)
    }

    static error(message) {
        console.error('Error:', message)
    }

    static warn(message) {
        console.warn('Warn:', message)
    }
}

module.exports = Logger;