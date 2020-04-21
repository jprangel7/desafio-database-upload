import { EntityRepository, Repository, getRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

@EntityRepository(Transaction)
class TransactionsRepository extends Repository<Transaction> {
  public async getBalance(): Promise<Balance> {
    const transactionRepository = getRepository(Transaction);
    let incomeValue = 0;
    let outcomeValue = 0;
    const allTransactions = await transactionRepository.find();

    allTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        incomeValue += transaction.value;
      } else {
        outcomeValue += transaction.value;
      }
    });

    const balance = {
      income: incomeValue,
      outcome: outcomeValue,
      total: incomeValue - outcomeValue,
    };

    return balance;
  }
}

export default TransactionsRepository;
