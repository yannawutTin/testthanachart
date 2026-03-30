CREATE TABLE IF NOT EXISTS public.products
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    "productName" text COLLATE pg_catalog."default" NOT NULL,
    price_per_piece double precision NOT NULL,
    "productCode" text COLLATE pg_catalog."default",
    CONSTRAINT products_pkey PRIMARY KEY ("ID")
);


CREATE TABLE IF NOT EXISTS public.stock
(
    "ID" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    product_id integer NOT NULL,
    qty integer NOT NULL DEFAULT 0,
    CONSTRAINT stock_pkey PRIMARY KEY ("ID")
);
