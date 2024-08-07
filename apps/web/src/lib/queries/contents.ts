import { HomePageContentVm } from '@/types';
import { apiUrl } from '../http';

export async function getHomePageContents() {
  const res = await fetch(apiUrl + '/api/contents');
  const data = await res.json();

  return data as HomePageContentVm;
}
