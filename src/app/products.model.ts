export interface Category{
  id:string,
  name:string,
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
export interface CreateProductDTO extends Omit<product ,"id" | "category"> {
  categoryId:String,
}
export interface UpdateProductDTO extends Partial<CreateProductDTO> { //con partial le deciamos que todos los atributos son opcionales
}


