// export interface Category{
//   id:string,
//   name:string,
// }
export interface Category{
  id:string,
  name:string,
  image:string,
}
export interface product{
  id:string,
  title:string,
  price: number,
  images: string[],
  category:Category,
  description:string,
  taxes?:number

}
export interface Product{
    id:string,
    title:string,
    price: number,
    description:string,
    category:Category,
    images: string[],
}
export interface CreateProductDTO extends Omit<product ,"id" | "category"> {
  categoryId:String,
}
export interface UpdateProductDTO extends Partial<CreateProductDTO> { //con partial le deciamos que todos los atributos son opcionales
}


