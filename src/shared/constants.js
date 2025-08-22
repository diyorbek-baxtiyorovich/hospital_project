export const COLLATERAL_CATEGORIES = [
  {title: "Ko'chmas mol-mulk", value: "immovables"},
  {title: "Ko'char mol-mulk", value: "movables"},
  {title: "Sug'urta va kafilliklar", value: "insurance_and_surety"},
  {title: "Likvidli ta'minotlar", value: "liquid_collateral"},
]

export const IMMOVABLE_TYPES = [
  {title: "Turar joy binosi", value: 1},
  {title: "Noturar joy binosi", value: 2},
]

export const MOVABLE_TYPES = [
  {title: "Yengil avtotransport vositalari", value: 1},
  {title: "Yuk transport vositalari", value: 2},
  {title: "Avtobus va mikroavtobuslar", value: 3},
  {title: "Maxsus texnikalar", value: 4},
  {title: "Asbob-uskunalar", value: 5},
]

export const INSURANCE_SURETY_TYPES = [
  {value: 1, title: "Sug'urta"},
  {value: 2, title: 'Uchinchi shaxs kafilligi'},
  {value: 3, title: 'Kafolatlar'},
]

export const LIQUID_COLLATERAL_TYPES = [
  {value: 1, title: 'Zargarlik buyumlari'},
  {value: 2, title: 'Depozitlar'},
  {value: 3, title: "Qimmatli qog'ozlar"},
]

export const APPLICATION_STAGES = {
  "yangi": 1,
  "jarayonda": 2,
  "ijobiy": 3,
  "salbiy": 4,
  "xatolik": 5,
}

export const MANUAL_STOP_FACTOR_DEFINITIONS = [
  {
    key: 'insufficient_operational_conditions',
    label: 'Faoliyatni amalga oshirish uchun shart-sharoit va imkoniyatlar mavjudligi',
  },
  {
    key: 'unsubstantiated_business_plan_tia',
    label: 'Biznes reja / TIA parametrlari asoslantirilganligi',
  },
  {
    key: 'non_compliant_credit_requirements',
    label: 'Kreditlash talablari Kredit siyosati va Kreditlashga oid ichki me’yoriy hujjatlarga muvofiqligi',
  },
  {
    key: 'debtor_related_entities',
    label: 'Muddati oʻtgan kredit qarzdorligi va "Kartoteka-2" qarzdorligi mavjud emas',
  },
  {
    key: 'intercompany_relationship',
    label: 'Oʻzaro aloqadorlik ("qarz oluvchi" – "sotuvchi" / "xizmat koʻrsatuvchi" yoki "garov egasi" (kafil) – "sotuvchi" / "xizmat koʻrsatuvchi" oʻrtasida) mavjud emas',
  },
]


export const COLLATERAL_CHECK_DEFINITIONS = [
  {condition: 'owner_name', label: "Ta'minot egasi"},
  {condition: 'owner_date_of_birth', label: "Tug'ilgan sanasi"},
  {
    condition: item => item.passport_serial || item.passport_num,
    label: 'Passport seriya, raqami',
    value: item => `${item.passport_serial || ''} ${item.passport_num || ''}`.trim(),
  },
  {condition: 'owner_stir', label: 'STIR'},
  {condition: 'passport_date_of_issue', label: 'Passport berilgan sana'},
  {condition: 'passport_date_of_expiry', label: 'Passport amal qilish muddati'},
  {condition: 'passport_place_of_issue', label: 'Kim tomonidan berilgan'},
  {condition: 'movables_model', label: 'Transport modeli'},
  {condition: 'cadastral_num', label: 'Kadastr raqami'},
  {condition: 'movables_date', label: 'Transport ishlab chiqarilgan yili'},
  {condition: 'insurance_company', label: "Sug'urta kompaniyasi"},
  {condition: 'bank', label: 'Bank'},
  {condition: 'government_organization', label: 'Davlat tashkiloti'},
  {condition: 'deposit_amount', label: 'Omonat miqdori'},
  {condition: 'jewelry_count', label: 'Zargarlik buyumlari soni'},
  {condition: 'jewelry_amount', label: 'Zargarlik buyumlari miqdori'},
  {condition: 'securities_amount', label: "Qimmatli qog'ozlar"},
  {condition: 'score_name', label: 'Result'},
]

export const SCORING_FIELD_DEFINITIONS = [
  {key: "coverage_ratio", name: "Коэффициент покрытия"},
  {key: "liquidity_ratio", name: "Коэффициент ликвидности"},
  {key: "autonomy_ratio", name: "Коэффициент автономии (в %)"},
  {key: "return_on_assets", name: "Рентабельность активов (ROA, в %)"},
  {key: "return_on_sales", name: "Рентабельность продаж (ROS, в %)"},
  {key: "credit_to_fixed_assets", name: "Отношение кредита к остаточной стоимости основных средств (в %)"},
  {key: "company_age_years", name: "Срок существования компании (в годах)"},
  {key: "bank_service_months", name: "Период обслуживания в банке (в месяцах)"},
  {key: "digital_services_usage", name: "Использование Mobile/Internet Banking"},
  {key: "project_share", name: "Доля участия в проекте (в %)"},
  {key: "credit_history", name: "Кредитная история"},
  {key: "debt_burden", name: "Долговая нагрузка"},
  {key: "business_resources", name: "Наличие необходимых объектов и оборудования"},
  {key: "management_experience_months", name: "Стаж руководства в компании (в месяцах)"},
  {key: "collateral_quality", name: "Качество залога имущества"},
  {key: "deposit_or_jewelry_usage", name: "Наличие депозита или ювелирных изделий из золота"},
  {key: "deposit_or_jewelry_usage_amount", name: "Сумма депозита или ювелирных изделий"},
  {key: "third_party_guarantee", name: "Поручительство третьего лица"},
  {key: "credit_insurance", name: "Наличие страховки от невозврата кредита"},
  {key: "total_score", name: "Общий скоринг-балл"},
]

export const MANUAL_SCORING_FIELDS_DEFINITIONS = [
  {key: "digital_services_usage", name: "Raqamli xizmatlardan foydalanish"},
  {key: "project_share", name: "Loyihadagi ulush"},
  {key: "business_resources", name: "Biznes resurslar"},
  {key: "management_experience_months", name: "Boshqaruv tajribasi"},
]
export const MANUAL_SCORING_FIELDS_FOR_YATT = [
  {key: "digital_services_usage", name: "Raqamli xizmatlardan foydalanish"},
  {key: "project_share", name: "Loyihadagi ulush"},
  {key: "business_resources", name: "Biznes resurslar"},
  {key: "management_experience_months", name: "Boshqaruv tajribasi"},
  {key: "reputation", name: "Tadbirkor reputatsiyasi"},
  {key: "loan_usage_period", name: "Kreditdan foydalanish muddati"},
]

export const AUTOMATIC_SCORING_FIELDS_DEFINITIONS = [
  {
    key: "coverage_ratio",
    name: "Qoplash koeffitsiyenti",
    description: "Qk = (joriy aktivlar - kelgusi davr xarajatlari - muddati oʻtgan debitorlik qarz) / joriy majburiyatlar Qk >2 (1-sinf), 2>Qk≥1 (2-sinf), 1>Qk>0 (3-sinf), 0≥Qk (4-sinf)"
  },
  {
    key: "liquidity_ratio",
    name: "Likvidlik koeffitsiyenti",
    description: "Lk = (Pul mablagʻlari +qisqa muddatli investitsiya + debitorlik qarzi- muddati oʻtgan debitorlik qarzi) / joriy maj. Lk >1,5 (1-sinf), 1,5>Lk>1 (2-sinf), 1>Lk>0 (3-sinf), 0≥Lk (4-sinf)"
  },
  {
    key: "autonomy_ratio",
    name: "Muxtoriyat koeffitsenti (Mk)",
    description: "Mk = Xususiy kapital / Balansning passivi yakuni Mk ≥60% (1-sinf), 60%>Mk≥30% (2-sinf), 30%>Mk>0% (3-sinf), 0%≥Mk (4-sinf) "
  },
  {key: "return_on_assets", name: "Aktivlar rentabelligi (ROA)", description: "(ROA =Sof foyda/jami aktivlar)"},
  {
    key: "return_on_sales",
    name: "Mahsulot sotish/xizmat koʻrsatish rentabelligi (ROS)",
    description: "(ROS  = Sof foyda/mahsulot sotishdan tushum)"
  },
  {
    key: "credit_to_fixed_assets",
    name: "Kredit miqdorining asosiy vositalar qoldiq qiymatiga nisbati",
    description: ""
  },
  {key: "company_age_years", name: "Kompaniyaning faoliyat yuritish muddati (yillarda)", description: ""},
  {key: "bank_service_months", name: "Bankning xizmat ko‘rsatish davri (oylarda)", description: ""},
  {key: "credit_history", name: "Kredit tarixi", description: ""},
  {key: "debt_burden", name: "Qarz yuki", description: ""},
  // {
  //   key: "deposit_or_jewelry_usage",
  //   name: "Depozit yoki oltindan yasalgan zargarlik buyumlarining mavjudligi",
  //   description: ""
  // },
  // {key: "deposit_or_jewelry_usage_amount", name: "Depozit yoki zargarlik buyumlarining summasi", description: ""},
]

export const AUTOMATIC_SCORING_FIELDS_FOR_YATT = [
  {key: "company_age_years", name: "Kompaniyaning faoliyat yuritish muddati (yillarda)", description: ""},
  {key: "bank_service_months", name: "Bankning xizmat ko‘rsatish davri (oylarda)", description: ""},
  {key: "credit_history", name: "Kredit tarixi", description: ""},
  {key: "debt_burden", name: "Qarz yuki", description: ""},
  // {
  //   key: "deposit_or_jewelry_usage",
  //   name: "Depozit yoki oltindan yasalgan zargarlik buyumlarining mavjudligi",
  //   description: ""
  // },
  // {key: "deposit_or_jewelry_usage_amount", name: "Depozit yoki zargarlik buyumlarining summasi", description: ""},
]
