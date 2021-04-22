// DOCS => https://thegraph.com/docs/graphql-api#fulltext-search-queries
import Axios, { AxiosResponse } from 'axios'

export enum GraphNetwork {
  mainnet = 'https://api.thegraph.com/subgraphs/name/filipesoccol/otoco',
  ropsten = 'https://api.thegraph.com/subgraphs/name/filipesoccol/otoco-ropsten',
}

export const requestSubgraph = async (
  network: GraphNetwork,
  query: string
): Promise<AxiosResponse> => {
  return await Axios.post(network, {
    query: query,
  })
}
