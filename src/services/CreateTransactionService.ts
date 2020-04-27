import { getRepository, getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const balance = await transactionRepository.getBalance();

    if (type === 'outcome' && balance.total < value)
      throw new AppError('No balance available for this transaction', 400);

    const checkCategoryExists = await categoryRepository.findOne({
      where: { title: category },
    });

    let transactionCategory;
    if (!checkCategoryExists) {
      const newCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(newCategory);
      transactionCategory = newCategory.id;
    } else {
      transactionCategory = checkCategoryExists.id;
    }

    const transaction = transactionRepository.create({
      title,
      value,
      type,
      category: transactionCategory,
    });

    await transactionRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
