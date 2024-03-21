import {Injectable} from "@angular/core";
import {BASE_API_URL} from "../../Config/api";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Store} from "@ngrx/store";
import {ActivatedRoute, Route} from "@angular/router";
import {data} from "autoprefixer";
import {catchError, map, of} from "rxjs";
import {
  findProductByFiltersFailure,
  findProductByFiltersSuccess,
  findProductByIdFailure,
  findProductByIdSuccess
} from "./product.action";

@Injectable({
  providedIn: "root",
})

export class ProductService{
  API_BASE_URL = BASE_API_URL + "/api/products";

  constructor(private store: Store, private httpClient: HttpClient,
              private route: Route, private activeRoute: ActivatedRoute) {

  }
  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem("jwt");
    return new HttpHeaders().set("Authorization", `Bearer ${token}`);
  }

  findProductByFilterService(requestPerm: any){
    const{
      category,
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      sort,
      stock,
      pageNumber,
      pageSize
    } = requestPerm;
    const params = new HttpParams()
      .set('category', category)
      .set('colors', colors)
      .set('sizes', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('sort', sort)
      .set('stock', stock)
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);

    const headers = this.getHeaders(); //if this name is change it won't work
    return this.httpClient.get(`${this.API_BASE_URL}/products`,{headers, params})
      .pipe(
        map((data: any)=>{
          return findProductByFiltersSuccess({payload: requestPerm})
        }),
        catchError((error: any)=>{
          return of(findProductByFiltersFailure(
            error.response && error.response.data.message ? error.response.data.message : error.message
          ))
        })
      ).subscribe((action)=>this.store.dispatch(action))
  }

  findProductByIdServices(productId: any){
    const headers = this.getHeaders(); //if this name is change it won't work
    return this.httpClient.get(`${this.API_BASE_URL}/product`,{headers})
      .pipe(
        map((data: any)=>{
          return findProductByIdSuccess({payload: data})
        }),
        catchError((error: any)=>{
          return of(findProductByIdFailure(
            error.response && error.response.data.message ? error.response.data.message : error.message
          ));
        })
      ).subscribe((action)=>this.store.dispatch(action))
  }
}