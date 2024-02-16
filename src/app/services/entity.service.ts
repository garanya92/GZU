import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export interface Paginator {
  content: any,
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  numbersOfElements: number,
  size: number,
  totalElements: number,
  totalPages: number,


}

export interface Container{
     status: boolean,
     errorMessage: string,
     entity: any,
      pageable: boolean,
       last: boolean,
       first:boolean
       paige:boolean,
       number: number,
      totalElements: number,
      pageCounter?: number
}



Injectable({
  providedIn: 'root'
})




/**
 * Базовий клас сущностей . Від нього унаслідуються інші
 * Він містить собі базові методи
 * Запроси до серверу ,  отрмиання данних від серверу
 */
export class EntityService {

  public baseUrl =  'http://91.202.145.108:8080'

  constructor(public  httpClient: HttpClient) {

  }

 /**
  *
  * @param path Отримуємо дані з серверу GET запитом
  * @returns
  */
  get  (path: string)
  {
      return this.httpClient.get<any>(this.baseUrl  + path)
  }

    /**
     * Оновлюємо дані Post запитом
     * @param entity
     * @param path
     * @returns
     */
    post(entity: any, path: string)
   {
       return this.httpClient.post<any>(this.baseUrl + path, entity);
   }



}
