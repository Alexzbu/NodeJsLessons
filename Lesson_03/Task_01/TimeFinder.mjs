class TimeFinder {
    constructor() {}

    getSeason() {
        const month = new Date().getMonth() + 1; 
        if (month >= 3 && month <= 5) return 'Весна'
        if (month >= 6 && month <= 8) return 'Літо'
        if (month >= 9 && month <= 11) return 'Осінь'
        return 'Зима'
    }
    
    getDayOfWeek() {
        const days = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'Пʼятниця', 'Субота']
        return days[new Date().getDay()]
    }
    
    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) return 'Ранок'
        if (hour >= 12 && hour < 18) return 'Обід'
        if (hour >= 18 && hour < 24) return 'Вечір'
        return 'Ніч'
    }

}

    export default new TimeFinder()