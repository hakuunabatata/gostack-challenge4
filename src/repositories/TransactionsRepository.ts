import Transaction from '../models/Transaction'

interface CreateTransactionDTO {
  title: string
  type: 'income' | 'outcome'
  value: number
}
interface Balance {
  income: number
  outcome: number
  total: number
}

class TransactionsRepository {
  private transactions: Transaction[]

  constructor() {
    this.transactions = []
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {
    let income = 0
    let outcome = 0
    let total = 0
    this.transactions.map(({ value, type }) => {
      if (type === 'income') {
        income += value
        total += value
      }
      if (type === 'outcome') {
        outcome += value
        total -= value
      }
      return total
    })

    return { income, outcome, total }
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type })

    this.transactions.push(transaction)

    return transaction
  }
}

export default TransactionsRepository
