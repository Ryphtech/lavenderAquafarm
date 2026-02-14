export const initialBreeds = [
    {
        id: 1,
        name: "Blue Grass Guppy",
        price: 250,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDXEIRG0O44NVcg69yxwxaXHamgostrmDJd9dHKOfNH6Tk47HmgY25LfWzdRcyePsM5bbHBA8j-NpjLLj7f2yf6YVVhBgp6VYd9C5utyjCUkmc4qVRJemilcN9XzSsBkzad0wGv7fZuGojw-1wOURE-wIWhgR8EcW_2UD_tECu7heQW_09ZlXTpSZnlCen6VjiLUXQzS61lSEb9Opyd_ASCBQEfiVVqSvbnAblORdl-0wKoXP9Ldu4EjH4pD6m83495vP3I1__4xk0",
        quality: "Top Quality",
        gender: "Male",
        grade: "Grade A",
        inStock: true,
    },
    {
        id: 2,
        name: "Albino Full Red",
        price: 400,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBfxSyrbacQcuhQC_Ktv9jQll4sgO14V3npPTyn-Td3IP-njH4pHTXkwECN2dSHy5fBuqhoxTtBazmJ1Geehzr69X43u4VXQGtLKDNfUR65pQebi54LZNaLir3L_MoPK68F84GEJa7PMSU6DxwqXzahW03whIJJ4o_J4ybaaHdlhq19d292Z_mtK8wls5aCjmSw21fIz8QyVFIfJOvJ3p2p6KrMevejyVHFrMHslA06vcUFnN3r8L5e1jx2oVxZeZzIbRtmJtv_kto",
        quality: "Medium Quality",
        gender: "Pair",
        grade: "Grade B+",
        inStock: true,
    },
    {
        id: 3,
        name: "Purple Mosaic",
        price: 150,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoDzwMGE8muD-4vxzPezMNABVxWDQQNUeX0GE3D7Pof-VJ3TEhJe1Qbo6eQs0pZcajYcKtTjPN5oFQW3U1pbtu_Oyo4Zuc9riMqV9JJt7ReQceV_KCb2xQIxQLczgICA6hc7KCsZI-2B6fBpfL8QmnC4xGKIDJKswECN3B8KLMAwWw9sXdlpwlBMHikkeq5wWmcO18MICnxGCQiDVIaPCJa1Xd27bm3dRskfQ85DbS6ivrKRiGTSuHYnG0t7wPAyxVEtQKqSY102c",
        quality: "Top Quality",
        gender: "Male",
        grade: "Grade A",
        inStock: false,
    },
    {
        id: 4,
        name: "Red Dragon",
        price: 300,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8-QuDVfK6IvLm2QCO7XCGqFHvDKIoEMHWMdL4bVG6fSyyDHm37uNdRe5mk6Plo698ksF_irY-SbqlOs7XRWhDjcdAAt-IsZPnbwOjyWccI9dVH-H8Y4N4_0P6z-umwA9WbKOO1tMVnWGfVRvYz5bVHKZ_ZgTjSk5h-TGQaW_KF_x_LHKOIwDOwbhUQkwNigENNORipk_mB_Gd5yBnxfmsmPzbA65m3WRumPzaKS-6SBM02tv73b170dQG_CiPKHMFjts_Zjt1OHE",
        quality: "Top Quality",
        gender: "Female",
        grade: "Grade A",
        inStock: true,
    },
    {
        id: 5,
        name: "Electric Blue",
        price: 350,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0cfS69wn1Y-tT2OMUBBwhL0qkkdHvhh-S2KCStnAH11xxrhllkU2AnHnGzMgXQc5ixFw3ANDhpmFy3U6FaI-8qU1gdFQxl8TkH5bLebvLuXcPD0JOvaNpWsjMU-Spo-UBh9J6ywCI5tDbBFoK14wIFddxGIDnpDPsblbe-tASgF94cgzIYOZHcgQxLb_jwJmRjaBYRYfC1Ar3LmNpGJ5Y1rR6qjHF7H17COoO4R4zr5IvvCInxxdC2zy61CP5aA6qabaZXSREiN8",
        quality: "Top Quality",
        gender: "Male",
        grade: "Grade A+",
        inStock: true,
    },
    {
        id: 6,
        name: "Black Metal Lace",
        price: 200,
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPe7flgpK6Q06ZVoaivFoZhlPVaAAoxFnjrlA9NMdgkljYkbwOVuxBePQpJDqMDHNw4G1bQGLElNcSbm6ti-DY4KL7xs4-h9kDDX6MnH6opqN4bV2tqjLm1vc2gdqtIBYC5FxFccnFlx4tX-oLGEUp3o7bbn7EOxHUdJz6eQQR5NXeM4ex5Sbje1QACK4NmWEzwyHppKThHUWlB5tqZ00IgpdzMmq875u4iO7mpPK-2-ws_ZQNYnqMJnsv-EGQuCn7PskLtbmePTY",
        quality: "Medium Quality",
        gender: "Male",
        grade: "Grade B",
        inStock: true,
    },
];

export const initialOrders = [
    {
        id: "ORD001",
        customerName: "Alice Smith",
        phone: "9876543210",
        address: "123 Lavender Lane, Kochi, Kerala",
        pincode: "682001",
        items: [
            { productName: "Blue Grass Guppy", quantity: 2, price: 250 }
        ],
        totalAmount: 500,
        status: "Pending", // Pending, Confirmed, Packed, Shipped
        date: "2023-10-25T10:30:00Z"
    },
    {
        id: "ORD002",
        customerName: "Bob Jones",
        phone: "9123456780",
        address: "456 Aqua Ave, Trivandrum, Kerala",
        pincode: "695001",
        items: [
            { productName: "Albino Full Red", quantity: 1, price: 400 }
        ],
        totalAmount: 400,
        status: "Confirmed",
        date: "2023-10-26T14:15:00Z"
    }
];
