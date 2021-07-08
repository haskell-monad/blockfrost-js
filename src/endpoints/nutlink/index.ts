import { handleError, getPaginationOptions } from '../../utils';
import { components } from '../../types/OpenApi';
import { PaginationOptions } from '../../types';
import { BlockFrostAPI } from '../../index';
import {
  DEFAULT_PAGINATION_PAGE_ITEMS_COUNT,
  DEFAULT_ORDER,
} from '../../config';

export async function nutlink(
  this: BlockFrostAPI,
  address: string,
): Promise<components['schemas']['nutlink_address']> {
  return new Promise((resolve, reject) => {
    this.axiosInstance(`${this.apiUrl}/nutlink/${address}`)
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => reject(handleError(err)));
  });
}

export async function nutlinkAddressTickers(
  this: BlockFrostAPI,
  address: string,
  pagination?: PaginationOptions,
): Promise<components['schemas']['nutlink_address_tickers']> {
  const paginationOptions = getPaginationOptions(pagination);

  return new Promise((resolve, reject) => {
    this.axiosInstance(`${this.apiUrl}/nutlink/${address}/tickers`, {
      params: {
        page: paginationOptions.page,
        count: paginationOptions.count,
        order: paginationOptions.order,
      },
    })
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => reject(handleError(err)));
  });
}

export async function nutlinkAddressTickersAll(
  this: BlockFrostAPI,
  address: string,
  order = DEFAULT_ORDER,
  batchSize = 10,
): Promise<components['schemas']['nutlink_address_tickers']> {
  let page = 1;
  const count = DEFAULT_PAGINATION_PAGE_ITEMS_COUNT;
  const res: components['schemas']['nutlink_address_tickers'] = [];

  const getPromiseBundle = () => {
    const promises = [...Array(batchSize).keys()].map(i =>
      this.nutlinkAddressTickers(address, {
        page: page + i,
        count,
        order,
      }),
    );
    page += batchSize;
    return promises;
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promiseBundle = getPromiseBundle();
    const pages = await Promise.all(promiseBundle);
    for (const page of pages) {
      res.push(...page);
      if (page.length < DEFAULT_PAGINATION_PAGE_ITEMS_COUNT) {
        return res;
      }
    }
  }
}

export async function nutlinkAddressTicker(
  this: BlockFrostAPI,
  address: string,
  ticker: string,
  pagination?: PaginationOptions,
): Promise<components['schemas']['nutlink_address_ticker']> {
  const paginationOptions = getPaginationOptions(pagination);

  return new Promise((resolve, reject) => {
    this.axiosInstance(`${this.apiUrl}/nutlink/${address}/tickers/${ticker}`, {
      params: {
        page: paginationOptions.page,
        count: paginationOptions.count,
        order: paginationOptions.order,
      },
    })
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => reject(handleError(err)));
  });
}

export async function nutlinkAddressTickerAll(
  this: BlockFrostAPI,
  address: string,
  ticker: string,
  order = DEFAULT_ORDER,
  batchSize = 10,
): Promise<components['schemas']['nutlink_address_ticker']> {
  let page = 1;
  const count = DEFAULT_PAGINATION_PAGE_ITEMS_COUNT;
  const res: components['schemas']['nutlink_address_ticker'] = [];

  const getPromiseBundle = () => {
    const promises = [...Array(batchSize).keys()].map(i =>
      this.nutlinkAddressTicker(address, ticker, {
        page: page + i,
        count,
        order,
      }),
    );
    page += batchSize;
    return promises;
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promiseBundle = getPromiseBundle();
    const pages = await Promise.all(promiseBundle);
    for (const page of pages) {
      res.push(...page);
      if (page.length < DEFAULT_PAGINATION_PAGE_ITEMS_COUNT) {
        return res;
      }
    }
  }
}

export async function nutlinkTickers(
  this: BlockFrostAPI,
  ticker: string,
  pagination?: PaginationOptions,
): Promise<components['schemas']['nutlink_tickers_ticker']> {
  const paginationOptions = getPaginationOptions(pagination);

  return new Promise((resolve, reject) => {
    this.axiosInstance(`${this.apiUrl}/nutlink/tickers/${ticker}`, {
      params: {
        page: paginationOptions.page,
        count: paginationOptions.count,
        order: paginationOptions.order,
      },
    })
      .then(resp => {
        resolve(resp.data);
      })
      .catch(err => reject(handleError(err)));
  });
}

export async function nutlinkTickersAll(
  this: BlockFrostAPI,
  ticker: string,
  order = DEFAULT_ORDER,
  batchSize = 10,
): Promise<components['schemas']['nutlink_tickers_ticker']> {
  let page = 1;
  const count = DEFAULT_PAGINATION_PAGE_ITEMS_COUNT;
  const res: components['schemas']['nutlink_tickers_ticker'] = [];

  const getPromiseBundle = () => {
    const promises = [...Array(batchSize).keys()].map(i =>
      this.nutlinkTickers(ticker, {
        page: page + i,
        count,
        order,
      }),
    );
    page += batchSize;
    return promises;
  };

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const promiseBundle = getPromiseBundle();
    const pages = await Promise.all(promiseBundle);
    for (const page of pages) {
      res.push(...page);
      if (page.length < DEFAULT_PAGINATION_PAGE_ITEMS_COUNT) {
        return res;
      }
    }
  }
}