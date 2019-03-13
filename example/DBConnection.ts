
export class DBConnection {

    async connect(): Promise<void> {
        return new Promise((resolve, rejcect) => {
            setTimeout(() => {
                // tslint:disable-next-line:no-console
                console.log('db connected');
                resolve();
            }, 2000);
        });
    }
    async close(): Promise<void> {
        return new Promise((resolve, rejcect) => {
            setTimeout(() => {
                // tslint:disable-next-line:no-console
                console.log('db closed');
                resolve();
            }, 2000);
        });
    }
}