import { Context } from "koa";
import { TokenType } from "../../type";
import { Author } from "../../database/tables/author";
import { Keyword } from "../../database/tables/keyword";
import { Supply } from "../../database/tables/supply";
import { SupplyAuthor } from "../../database/tables/supplyAuthor";


interface AddSupplyParams {
  title: string;
  publisher: string;
  price: number;//批发价 
  amount: number;
  authors: string[];
  keywords: string[];
}
//供应商添加一条供应信息
export const addSupply = async (ctx: Context) => {
  const supplierId = (ctx.auth as TokenType).id;
  const {title, publisher, price, amount, authors, keywords} = ctx.request.body as AddSupplyParams;
  const authorIds:number[] = [];
  const keywordIds:number[] = [];
  for(const author of authors) {
    const hasAuthor = await Author.findOne({where: {name: author}});
    if(hasAuthor) {
      authorIds.push(hasAuthor.dataValues.id)
    } else {
      const newAuthor = await Author.create({name: author});
      authorIds.push(newAuthor.dataValues.id);
    }
  } 
  for(const keyword of keywords) {
    const hasKeyword = await Keyword.findOne({where: {content: keyword}});
    if(hasKeyword) {
      authorIds.push(hasKeyword.dataValues.id)
    } else {
      const newKeyword = await Keyword.create({content: keyword});
      authorIds.push(newKeyword.dataValues.id);
    }
  }
  const newSupply = await Supply.create({title, publisher, price, amount, supplier_id:supplierId})
  for(const authorId of authorIds) {
    await SupplyAuthor.create({
      supply_id: newSupply.dataValues.id,
      author_id: authorId,
     })
  }
  for(const keywordId of keywordIds) {
    await SupplyAuthor.create({
      supply_id: newSupply.dataValues.id,
      keyword_id: keywordId,
     })
  }
  ctx.status = 200;
  ctx.body = {
    msg: "success",
    supply: {
      id:newSupply.dataValues.id,
      title,
      publisher,
      price,
      amount,
      authors,
      keywords,
      supplierId,
    }
  }

}

