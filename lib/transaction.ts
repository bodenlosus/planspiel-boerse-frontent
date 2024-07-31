import TransactionCategorie from '@/lib/transaction_categorie';
export default class Transaction{
    id: number;
    title:string;
    timestamp: Date;
    categorie: TransactionCategorie;
    amount: number;

    constructor(id:number, title:string, timestamp:Date, categorie:TransactionCategorie, amount:number){
        this.id = id;
        this.title = title
        this.timestamp = timestamp;
        this.categorie = categorie;
        this.amount = amount;
    }
}