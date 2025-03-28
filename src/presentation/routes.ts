import { Router } from "express";
import { AttributeRoutes } from "./routes/admin/attributes.routes";
import { CategoryRoutes } from "./routes/admin/category.routes";
import { DiscountsRoutes } from "./routes/admin/discount.routes";
import { ShippingAddressRoutes } from "./routes/admin/shipping-address.routes";
import { SubCategoryRoutes } from "./routes/admin/sub-category.routes";
import { SystemUserRoutes } from "./routes/admin/system-users.routes";
import { TaxRoutes } from "./routes/admin/tax.routes";
import { UserRoutes } from "./routes/admin/users.routes";
import { WishListRoutes } from "./routes/admin/wishlist.routes";
import { CloudinaryRoutes } from "./routes/adpaters/cloudinary.routes";
import { SystemAuthorizationRoutes } from "./routes/auth/system-authorization.routes";
import { ActionRoutes } from './routes/permissions/action.routes';
import { PageRoutes } from "./routes/permissions/page.routes";
import { PermissionsByRoleRoutes } from "./routes/permissions/permissions-by-role.routes";
import { RoleRoutes } from "./routes/permissions/role.routes";

export class AppRoutes {

     static get routes(): Router {
          const router = Router();

          router.use('/api/system-auth', SystemAuthorizationRoutes.routes)
          router.use('/api/system-users', SystemUserRoutes.routes)

          //router.use('/api/auth', AuthorizationRoutes.routes)
          router.use('/api/users', UserRoutes.routes)

          router.use('/api/actions', ActionRoutes.routes)
          router.use('/api/permissions', PermissionsByRoleRoutes.routes)
          router.use('/api/pages', PageRoutes.routes)
          router.use('/api/roles', RoleRoutes.routes)
          router.use('/api/category', CategoryRoutes.routes)
          router.use('/api/sub-category', SubCategoryRoutes.routes)
          router.use('/api/taxes', TaxRoutes.routes)
          router.use('/api/attributes', AttributeRoutes.routes)
          router.use('/api/discounts', DiscountsRoutes.routes)
          router.use('/api/wishlist', WishListRoutes.routes)
          router.use('/api/shipping-address', ShippingAddressRoutes.routes)

          router.use('/api/upload', CloudinaryRoutes.routes)

          return router;
     }

}