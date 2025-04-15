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
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, provider, "providerId", "createdAt", "updatedAt", role, image) FROM stdin;
1	Bro Admin	admin@tokoeno.com	\N	\N	2025-04-13 16:57:30.306	2025-04-13 16:57:30.391	USER	\N
2	Budi Buyer	budi@tokoeno.com	\N	\N	2025-04-13 16:57:30.427	2025-04-13 16:57:30.429	USER	\N
f7615234-f0bc-4fd8-9a50-e42f45c6fd9a	Corneo Alpha	corneoalpha@gmail.com	google	113770517497895525298	2025-04-14 07:31:00.564	2025-04-14 07:31:00.564	USER	https://lh3.googleusercontent.com/a/ACg8ocIf2tNRrAXrhX8DJYqgBJvN8KYuS-erXRYEXowjUB4eEUAnAZo=s96-c
2e507bcc-fb97-4071-b546-b5b1bacf6565	y. ᴀʟᴘʜᴀ	alphrenoorz@gmail.com	google	102001982908865439766	2025-04-14 07:34:03.641	2025-04-14 07:34:03.641	ADMIN	https://lh3.googleusercontent.com/a/ACg8ocJpioMFkNu60dKW4eEzTt9L2_SZoUq6aoStPO9NyzNguBl-zpU=s96-c
ae248250-6f89-4067-992d-0c5c55e835a0	ALPHARENO YANUAR SYAPUTRA	alphrenoorz@student.ub.ac.id	google	118419795328106238337	2025-04-14 07:34:28.834	2025-04-14 07:34:28.834	USER	https://lh3.googleusercontent.com/a/ACg8ocLcyyk95vU7Dwsztpie4uETqtONrkjDRcDX-2o-ghm2mXesIcM=s96-c
\.


--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Account" (id, "userId", provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state) FROM stdin;
550a4f41-8206-4bec-9886-d884ffeef170	f7615234-f0bc-4fd8-9a50-e42f45c6fd9a	google	113770517497895525298	\N	ya29.a0AZYkNZiNkzHMm9zI_P4S1ie1R7XGbqw98q2cojlhnZ-qJ-tw03AMgPa-q9lpTMmqLOy8fKiRGoCmtEVC3y9-BaUZTMnuX2Qj5Kuh-xMbcVPPhqobEpyvTAX2AAjw9QVi2haoeV0ermzyIeV5j4DlwRuCuW2-Fu_L_bdpYAWuaCgYKAdYSARESFQHGX2MibNDTlqbck-5hRQ6mHYrRyA0175	1744619459	Bearer	https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid	eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTA0NDY1NjQ5ZmZhNjA2NTU3NjUwYzdlNjVmMGE4N2FlMDBmZTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTM3NzA1MTc0OTc4OTU1MjUyOTgiLCJlbWFpbCI6ImNvcm5lb2FscGhhQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiZGw0NHQtdEFUQmhzWEJnZndGOW1qUSIsIm5hbWUiOiJDb3JuZW8gQWxwaGEiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUNnOG9jSWYydE5SckFYcmhYOERKWXFnQkp2TjhLWXVTLWVyWFJZRVhvd2pVQjRlRVVBbkFabz1zOTYtYyIsImdpdmVuX25hbWUiOiJDb3JuZW8iLCJmYW1pbHlfbmFtZSI6IkFscGhhIiwiaWF0IjoxNzQ0NjE1ODYwLCJleHAiOjE3NDQ2MTk0NjB9.pis-ei85NTGhDFvvamlEo-RNDbNJunt8wSGXUfwn-7q7E4GKlLwj65Ac_s4FIOSA4pMsaFpP8W3en0c80bWebvg7FgWjGTscfCD-jNnlA6eZZnwjkzjmKFugAFskwRNFfkiUJ2Lyazitwgt89AITETxtFUJ1SvgqWyXE15qGcC8hIK3nrDIj3QV1gYEd_qNXVHdvLZ0Ro9dgJ0GZ_QeC1dosc8F4r36jg-VsXIjQML6SPfpTxcIkNsAhKLkhNT-JTDkMU0aouuL_xaBGysBvbnYEIRLmg5scG3l6r-cD9Bu55Leii4_NUPAyLhumM8ds0Ro1TRQp04dH_ctBAkck6g	\N
6f2e5e36-c201-4fbd-8691-fe3da9b47c7d	2e507bcc-fb97-4071-b546-b5b1bacf6565	google	102001982908865439766	\N	ya29.a0AZYkNZg4PtD202-uSdo1YYPT0DtKdriMiBAbvhzbQI62cik37zTnSZ5YrGpsfrpxKBFAi6niO9ToVS1_XpFSFfosrbJrflqi_oMnt4PESHqAux2XLVnvim2F6LCBrIJoH_yUk1XDmi58ZRZJhOnLxuMSop3eM2p3xC42UlHOaCgYKAXwSARASFQHGX2Mip22Gh9j1rAxdi6q9oTeVLA0175	1744619642	Bearer	openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email	eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTA0NDY1NjQ5ZmZhNjA2NTU3NjUwYzdlNjVmMGE4N2FlMDBmZTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDIwMDE5ODI5MDg4NjU0Mzk3NjYiLCJlbWFpbCI6ImFscGhyZW5vb3J6QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiWGFJa0RXQnU3SmQxUVB1QWk3VGpOdyIsIm5hbWUiOiJ5LiDhtIDKn-G0mMqc4bSAIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pwaW9NRmtOdTYwZEtXNGVFelR0OUwyX1Nab1VxNmFvU3RQTzlOeXpOZ3VCbC16cFU9czk2LWMiLCJnaXZlbl9uYW1lIjoieS4iLCJmYW1pbHlfbmFtZSI6IuG0gMqf4bSYypzhtIAiLCJpYXQiOjE3NDQ2MTYwNDMsImV4cCI6MTc0NDYxOTY0M30.HJGISboQyl3jffEtaMTUpPfoxx4NI-QpqnadYHViBUr1682aQbgeQBIZtrq1CXcCwJg6x6qPvNy6PuaF1AKNQt97CsHG4qKeuu-OsVVBjODjKpzEU-P2L1p2mAE9c3IAV7-DpzO0MJJROvdQ1nPaT_qSQS8CO9sE_dGdRHKXPdWoua7UKlwQ1X9FE3x8AGSXgsY61Wd97aSLMPlOZa09dALBQJyU-2R8hIiNzAl220SS8gDBN6_SspgQemOiq_r7BSh243Mtqv5GcaGZ4J25UWf4Y_MoNAtQzcpfP7Sxg3syIc_5Irupu2kf-jbXeGYi_3joTqQhtpPu5hiqWMYIUw	\N
9fda35e4-b3ef-4d9b-9a95-aaa7a3803f3b	ae248250-6f89-4067-992d-0c5c55e835a0	google	118419795328106238337	\N	ya29.a0AZYkNZjuC4__qLT7Hpa30UbOb10xgwGeeA0lFQt-9vCVrQgkLFgYrkkJcyAYuOccqbuZr6g3lV3QGG5z6-8K4hrbRmkYD0d00kKf2onegZYbhoGsiQXJV9SUPcR4XQisIVigaYt1eDPR1Kl8sMaNkVbR4SaUBHDrRsDek-rVaCgYKARcSAQ8SFQHGX2MiIJLsBYUkAfaCy5tiW3Nhfw0175	1744619667	Bearer	openid https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile	eyJhbGciOiJSUzI1NiIsImtpZCI6ImM3ZTA0NDY1NjQ5ZmZhNjA2NTU3NjUwYzdlNjVmMGE4N2FlMDBmZTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI1NjcyMTEzOTAwOTQtNnQxMzhycmM2YXBtb2lxMXBqNW91cXNhY2g5M2hoMWYuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTg0MTk3OTUzMjgxMDYyMzgzMzciLCJoZCI6InN0dWRlbnQudWIuYWMuaWQiLCJlbWFpbCI6ImFscGhyZW5vb3J6QHN0dWRlbnQudWIuYWMuaWQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6InpnVUI0WmNFNWJuMk9USG9PRHFGTlEiLCJuYW1lIjoiQUxQSEFSRU5PIFlBTlVBUiBTWUFQVVRSQSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMY3l5azk1dlU3RHdzenRwaWU0dUVUcXRPTnJrakRSY0RYLTJvLWdobTJtWGVzSWNNPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFMUEhBUkVOTyIsImZhbWlseV9uYW1lIjoiWUFOVUFSIFNZQVBVVFJBIiwiaWF0IjoxNzQ0NjE2MDY4LCJleHAiOjE3NDQ2MTk2Njh9.i5RIrC_PpNEDTqi8O2dz9l78zP_4-rE-_ONk2sB3JV4XrHQb4nUZLhghnSwN3Ol1qCbNhENmuASmol5aQv55A3Bpr8vSl5tf9tdakmF-VU-OsfDNd1AtPLves8j_LwH8WAb3UYl6IAbQfGUCXWMDhjjhdJfuGp4rSgb76lJdaUzkMr9tmijGgwMNHpaA28edAd8WfWYaUKE89pwDzR71TCdrg5LConXOy7RX-2MWYmqx8cHNt4yBWpT5FnCfCUmdefnCzZdstf61s3NMYx3rg1j-8H_1EGLJ0dYV-soHRh1Ci_Lr5Jsfk6MDnNVgmmt74bJ9hktExV-hS42uEDZ2Gg	\N
\.


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, name, slug, "createdAt", "updatedAt") FROM stdin;
1	Smartphones	smartphones	2025-04-13 16:57:30.473	2025-04-13 16:57:30.473
2	Laptops	laptops	2025-04-13 16:57:30.473	2025-04-13 16:57:30.473
\.


--
-- Data for Name: Event; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Event" (id, name, slug, "imageUrl", "startDate", "endDate", "createdAt", "updatedAt") FROM stdin;
3	C	C	/img/events/r10.jpg	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-04-13 17:19:54.262	2025-04-13 17:18:54.367
4	D	D	/img/events/r12.jpg	1970-01-01 00:00:00	1970-01-01 00:00:00	2025-04-13 17:19:54.262	2025-04-13 17:19:23.585
1	A	A	/img/events/r6.jpg	2025-04-13 16:57:30.467	2025-04-20 16:57:30.467	2025-04-13 16:57:30.467	2025-04-13 17:23:39.642
2	B	B	/img/events/r7.jpg	2025-04-13 16:57:30.467	2025-04-27 16:57:30.467	2025-04-13 16:57:30.467	2025-04-13 17:23:39.642
\.


--
-- Data for Name: Order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Order" (id, "userId", total, status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Store; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Store" (id, name, slug, logo, description, location, "ownerId", "createdAt", "updatedAt", "isApproved") FROM stdin;
1	TOKOENO Official	tokoeno-official	\N	\N	\N	1	2025-04-13 16:57:30.43	2025-04-13 16:57:30.431	t
\.


--
-- Data for Name: Product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Product" (name, price, stock, "createdAt", description, slug, id, "storeId", "updatedAt") FROM stdin;
Kalkulator	35000	50	2025-03-16 07:43:42.316	Kalkulator keren, pakenya ga bikin pusing.	kalkulator	1	1	2025-04-13 16:57:30.446
Kipas Angin	225000	15	2025-03-16 07:43:42.316	Kipas angin, ga bikin masuk angin.	kipas-angin	2	1	2025-04-13 16:57:30.446
HP Bekas	1775000	10	2025-03-16 08:56:45.226	HP preloved, ga bekas bekas banget.	hp-bekas	3	1	2025-04-13 16:57:30.446
Monitor LED	1250000	25	2025-03-16 08:56:45.226	Monitor LED, bekas rasa baru.	monitor-led	4	1	2025-04-13 16:57:30.446
Ayam Goreng Mak Dura	44000	20	2025-03-16 08:56:45.226	joss	ayam-goreng-mak-dura	5	1	2025-04-13 16:57:30.446
Motherboard	2250000	5	2025-03-16 08:56:45.226	A motherboard is a circuit board inside general-purpose computing systems, including personal computers, smart televisions, smart monitors, and other similar devices, which supports communication between different electrical components and houses components such as the CPU, memory, etc.	motherboard	6	1	2025-04-13 16:57:30.446
iPhone X Refurbished	5000000	10	2025-04-13 16:57:30.457	iPhone X bekas, kondisi 90%	iphone-x-refurbished	7	1	2025-04-13 16:57:30.459
Laptop ASUS Gaming	12000000	5	2025-04-13 16:57:30.457	Laptop gaming spek dewa	laptop-asus-gaming	8	1	2025-04-13 16:57:30.459
\.


--
-- Data for Name: OrderItem; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."OrderItem" (id, "orderId", "productId", quantity, price, "createdAt") FROM stdin;
\.


--
-- Data for Name: ProductImage; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ProductImage" (url, id, "productId") FROM stdin;
/img/r1.jpg	1	3
/img/r3.jpg	3	6
/img/r2.jpg	2	2
/img/r5.jpg	5	4
/img/r6.jpg	6	5
/img/r7.jpg	7	1
/img/r8.jpg	8	2
/img/r9.jpg	9	3
/img/r10.jpg	10	4
/img/r11.jpg	11	5
/img/r12.jpg	12	6
/img/r4.jpg	4	7
/img/r13.jpg	13	8
\.


--
-- Data for Name: Review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Review" (id, "userId", "productId", rating, comment, "createdAt", "updatedAt") FROM stdin;
1	2	7	5	iPhone X mulus banget!	2025-04-13 16:57:30.498	2025-04-13 16:57:30.499
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "sessionToken", "userId", expires) FROM stdin;
9feb5a30-ad4d-4763-a6b6-979e45335324	40ee4fe6-1b0b-4af8-86d1-6330a3f277fa	f7615234-f0bc-4fd8-9a50-e42f45c6fd9a	2025-05-14 07:31:00.592
6fbd35e8-42c0-428c-9c80-435e116b73c3	98a8292f-d0e2-45bb-bdc5-e28c8253a5b2	ae248250-6f89-4067-992d-0c5c55e835a0	2025-05-14 07:34:28.848
e7029f6e-cd04-4c43-af87-6bb87baeaad0	83b72baa-43f5-460b-b968-4c5643216208	2e507bcc-fb97-4071-b546-b5b1bacf6565	2025-05-15 04:30:06.722
\.


--
-- Data for Name: Trending; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Trending" (id, "productId", rank, "createdAt", "updatedAt") FROM stdin;
1	7	1	2025-04-13 16:57:30.503	2025-04-13 16:57:30.504
\.


--
-- Data for Name: _ProductCategories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."_ProductCategories" ("A", "B") FROM stdin;
1	7
2	8
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
18f53f03-4029-457d-a71e-9196b887a775	944fd252f4a914085cd6b9c0c0ef1236335368bc01880b46917572f4880a547c	2025-03-16 14:27:07.89259+07	20250316060043_add_product_images	\N	\N	2025-03-16 14:27:07.858+07	1
635493d9-72b1-41ff-a084-0c32c37580b2	d12b350424ec9babff74c7102f4d1595c45dafd608b629bb2355405fd5902f10	2025-03-16 14:27:07.910568+07	20250316060757_add_product_images	\N	\N	2025-03-16 14:27:07.895428+07	1
a1b6ee3c-833e-458f-b8c2-15227a65d3a9	eec9bfbb44fd2f7e1d178e7c8914010193324c5545d432fb4e2aa50ccd45e1c2	2025-03-16 14:27:07.916466+07	20250316061436_add_description_column	\N	\N	2025-03-16 14:27:07.911782+07	1
4b6722c4-3398-416e-992b-6e539ef068d7	161b37d5d6ee9249501395ef592e1b6e2bf8db35cde3a9212a1fd2c8ab2984be	2025-03-16 14:27:39.199709+07	20250316072739_init	\N	\N	2025-03-16 14:27:39.136031+07	1
22e2a266-3c94-400e-be19-ff04a718cdf8	fe934ed4e5e8d41183b19e6758c6962158b32e24531e224add6872d7f0d1c040	2025-04-13 23:05:35.682737+07	20250413160535_add_new_tables	\N	\N	2025-04-13 23:05:35.601138+07	1
aac8ad76-7651-4dcd-9eba-a8789aae33ff	657837440e9f04e98ac61862ba601e9f791704ed71f6282c52ea98b8ba925ed0	2025-04-14 13:08:09.76359+07	20250414060808_fix_relations	\N	\N	2025-04-14 13:08:09.6767+07	1
a23f25aa-0115-471d-930b-3079cf9e7904	4a82884ca91fe9c9e3771419c68a89c872d4b10436348d947011304f5e10bd71	2025-04-14 14:11:27.005022+07	20250414071126_add_user_image	\N	\N	2025-04-14 14:11:26.998775+07	1
565aa08c-b1c8-4e7c-8ba2-ab35fcd6ded7	dde1e431f72e1c5ba2ea6c4f2335c07e75fdf9e0440d14adb9a420b47cf33499	2025-04-14 14:28:57.628846+07	20250414072856_add_session	\N	\N	2025-04-14 14:28:57.612692+07	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 2, true);


--
-- Name: Event_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Event_id_seq"', 2, true);


--
-- Name: OrderItem_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."OrderItem_id_seq"', 1, false);


--
-- Name: Order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Order_id_seq"', 1, false);


--
-- Name: ProductImage_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ProductImage_id_seq"', 13, true);


--
-- Name: Product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Product_id_seq"', 8, true);


--
-- Name: Review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Review_id_seq"', 1, true);


--
-- Name: Store_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Store_id_seq"', 1, true);


--
-- Name: Trending_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Trending_id_seq"', 1, true);


--
-- PostgreSQL database dump complete
--

