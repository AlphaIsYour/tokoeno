--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO postgres;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS '';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Product" (
    name text NOT NULL,
    price integer NOT NULL,
    stock integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text,
    slug text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public."Product" OWNER TO postgres;

--
-- Name: ProductImage; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ProductImage" (
    url text NOT NULL,
    id integer NOT NULL,
    "productId" integer NOT NULL
);


ALTER TABLE public."ProductImage" OWNER TO postgres;

--
-- Name: ProductImage_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."ProductImage_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."ProductImage_id_seq" OWNER TO postgres;

--
-- Name: ProductImage_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."ProductImage_id_seq" OWNED BY public."ProductImage".id;


--
-- Name: Product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Product_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Product_id_seq" OWNER TO postgres;

--
-- Name: Product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Product_id_seq" OWNED BY public."Product".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product" ALTER COLUMN id SET DEFAULT nextval('public."Product_id_seq"'::regclass);


--
-- Name: ProductImage id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImage" ALTER COLUMN id SET DEFAULT nextval('public."ProductImage_id_seq"'::regclass);


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (name, price, stock, "createdAt", description, slug, id) FROM stdin;
Kalkulator	35000	50	2025-03-16 07:43:42.316	Kalkulator keren, pakenya ga bikin pusing.	kalkulator	1
Kipas Angin	225000	15	2025-03-16 07:43:42.316	Kipas angin, ga bikin masuk angin.	kipas-angin	2
HP Bekas	1775000	10	2025-03-16 08:56:45.226	HP preloved, ga bekas bekas banget.	hp-bekas	3
Monitor LED	1250000	25	2025-03-16 08:56:45.226	Monitor LED, bekas rasa baru.	monitor-led	4
Ayam Goreng Mak Dura	44000	20	2025-03-16 08:56:45.226	joss	ayam-goreng-mak-dura	5
Motherboard	2250000	5	2025-03-16 08:56:45.226	A motherboard is a circuit board inside general-purpose computing systems, including personal computers, smart televisions, smart monitors, and other similar devices, which supports communication between different electrical components and houses components such as the CPU, memory, etc.	motherboard	6
\.


--
-- Data for Name: ProductImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductImage" (url, id, "productId") FROM stdin;
/img/r1.jpg	1	3
/img/r3.jpg	3	6
/img/r2.jpg	2	2
/img/r5.jpg	5	4
/img/r4.jpg	4	1
/img/r6.jpg	6	5
/img/r7.jpg	7	1
/img/r8.jpg	8	2
/img/r9.jpg	9	3
/img/r10.jpg	10	4
/img/r11.jpg	11	5
/img/r12.jpg	12	6
/img/r13.jpg	13	1
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
18f53f03-4029-457d-a71e-9196b887a775	944fd252f4a914085cd6b9c0c0ef1236335368bc01880b46917572f4880a547c	2025-03-16 14:27:07.89259+07	20250316060043_add_product_images	\N	\N	2025-03-16 14:27:07.858+07	1
635493d9-72b1-41ff-a084-0c32c37580b2	d12b350424ec9babff74c7102f4d1595c45dafd608b629bb2355405fd5902f10	2025-03-16 14:27:07.910568+07	20250316060757_add_product_images	\N	\N	2025-03-16 14:27:07.895428+07	1
a1b6ee3c-833e-458f-b8c2-15227a65d3a9	eec9bfbb44fd2f7e1d178e7c8914010193324c5545d432fb4e2aa50ccd45e1c2	2025-03-16 14:27:07.916466+07	20250316061436_add_description_column	\N	\N	2025-03-16 14:27:07.911782+07	1
4b6722c4-3398-416e-992b-6e539ef068d7	161b37d5d6ee9249501395ef592e1b6e2bf8db35cde3a9212a1fd2c8ab2984be	2025-03-16 14:27:39.199709+07	20250316072739_init	\N	\N	2025-03-16 14:27:39.136031+07	1
\.


--
-- Name: ProductImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductImage_id_seq"', 13, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 6, true);


--
-- Name: ProductImage ProductImage_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_pkey" PRIMARY KEY (id);


--
-- Name: Product Product_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Product"
    ADD CONSTRAINT "Product_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Product_slug_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Product_slug_key" ON public."Product" USING btree (slug);


--
-- Name: ProductImage ProductImage_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ProductImage"
    ADD CONSTRAINT "ProductImage_productId_fkey" FOREIGN KEY ("productId") REFERENCES public."Product"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

