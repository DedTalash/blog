export class Formatter {
    static toDate (date: Date):string {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date)
    }
}

// Project Console: https://console.firebase.google.com/project/blog-7ceac/overview
//     Hosting URL: https://blog-7ceac.web.app

