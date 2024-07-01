import payload from "payload";
import { Category } from "payload/generated-types";
import { CollectionAfterChangeHook } from "payload/types";

export const afterProductChanges: CollectionAfterChangeHook = async ({
  doc,
  req,
  previousDoc,
}) => {
  try {
    if ("category" in doc) {
      if (doc.category !== previousDoc.category) {
        const category: Category = await payload.findByID({
          collection: "categories",
          id: doc.category,
          depth: 0,
        });

        const updatedProducts = [...(category?.products || []), doc.id];
        if (!category?.products.includes(doc.id)) {
          payload.update({
            collection: "categories",
            id: Number(doc.category),
            data: {
              products: updatedProducts,
            },
          });
        }
        if ("category" in previousDoc) {
          const previousDocCategory: Category = await payload.findByID({
            collection: "categories",
            id: previousDoc.category,
            depth: 0,
          });

          if (previousDocCategory?.products.includes(doc.id)) {
            payload.update({
              collection: "categories",
              id: Number(previousDoc.category),
              data: {
                products: previousDocCategory.products.filter(
                  (pCat) => pCat !== doc.id
                ),
              },
            });
          }
        }
      }
    }
  } catch (error) {
    req.payload.logger.error(error);
  }
};
