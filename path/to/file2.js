class MathUtils {
    static factorial(n) {
        if (n === 0) {
            return 1;
        }
        return n * this.factorial(n - 1);
    }

    static isPrime(n) {
        if (n <= 1) {
            return false;
        }
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) {
                return false;
            }
        }
        return true;
    }
}