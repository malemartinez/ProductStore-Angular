export interface Category{
  id:string,
  name:string,
}
export interface product{
  id:number,
  title:string,
  price: number,
  images: string[],
  category:Category,
  description:string,

}
export interface CreateProductDTO extends Omit<product ,"id" | "category"> {
  categoryId:String,

}
