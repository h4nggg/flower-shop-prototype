export type VariantType = "Single Stem" | "Vase Arrangement" | "Wholesale Box";

export interface Variant {
    id: string;
    type: VariantType;
    price: number;
    original_price: number | null;
    stock: number;
    image_url?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    base_price: number;
    images: string[];
    tags: string[];
    details: {
        dimensions: string;
        care: string;
    };
    variants: Variant[];
    created_at: string;
}

export const products: Product[] = [
    // ══════════════ 1. Korean Velvet Rose ══════════════
    {
        id: "p-rose",
        name: "Korean Velvet Rose",
        slug: "korean-velvet-rose",
        description:
            "A stunning Korean rose with velvety petals that look and feel remarkably lifelike. Each petal is crafted with a subtle gradient from dusty pink to deep mauve, creating a captivating visual depth. Perfect as a standalone statement piece or combined in curated arrangements.",
        base_price: 18.99,
        images: [
            "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80",
            "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&q=80",
        ],
        tags: ["Best Seller"],
        details: {
            dimensions:
                "Stem: 60cm length, 10cm bloom · Vase: 18×12cm, 35cm total · Box: 60×40×30cm, 24 blooms",
            care: "Dust gently with a soft brush. Avoid direct sunlight to preserve color vibrancy. Can be gently reshaped with warm steam.",
        },
        variants: [
            {
                id: "v-rose-stem",
                type: "Single Stem",
                price: 18.99,
                original_price: null,
                stock: 45,
            },
            {
                id: "v-rose-vase",
                type: "Vase Arrangement",
                price: 89.99,
                original_price: null,
                stock: 12,
                image_url:
                    "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
            },
            {
                id: "v-rose-box",
                type: "Wholesale Box",
                price: 189.99,
                original_price: 239.99,
                stock: 8,
                image_url:
                    "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&q=80",
            },
        ],
        created_at: "2025-11-01T00:00:00Z",
    },

    // ══════════════ 2. Blush Peony ══════════════
    {
        id: "p-peony",
        name: "Blush Peony",
        slug: "blush-peony",
        description:
            "Luxurious, full-bloom peony in a delicate blush tone. Each layer of petals is individually placed for maximum realism. The generous bloom head makes this a showstopping addition to any vase or arrangement. Also available as a modern ikebana-style display and a bulk box.",
        base_price: 22.99,
        images: [
            "https://images.unsplash.com/photo-1562690868-60bbe7293e94?w=800&q=80",
            "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80",
        ],
        tags: ["New Arrival"],
        details: {
            dimensions:
                "Stem: 65cm length, 14cm bloom · Bowl: 22×8cm, 45cm spread · Box: 70×50×35cm, 36 pcs",
            care: "Gently fluff petals after unpacking. Dust with compressed air. Avoid moisture. Petals can be refreshed with light steam.",
        },
        variants: [
            {
                id: "v-peony-stem",
                type: "Single Stem",
                price: 22.99,
                original_price: null,
                stock: 30,
            },
            {
                id: "v-peony-vase",
                type: "Vase Arrangement",
                price: 74.99,
                original_price: null,
                stock: 10,
                image_url:
                    "https://images.unsplash.com/photo-1460039230329-eb070f0a6cf5?w=800&q=80",
            },
            {
                id: "v-peony-box",
                type: "Wholesale Box",
                price: 269.99,
                original_price: 329.99,
                stock: 5,
                image_url:
                    "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80",
            },
        ],
        created_at: "2026-01-10T00:00:00Z",
    },

    // ══════════════ 3. Dusty Miller ══════════════
    {
        id: "p-dusty-miller",
        name: "Dusty Miller",
        slug: "dusty-miller",
        description:
            "Silvery-grey foliage that adds a touch of ethereal elegance to any arrangement. These realistic dusty miller branches feature soft, felt-like leaves with intricate veining. A favorite among interior designers for neutral-toned spaces. Available as individual branches or a curated tulip-mix vase.",
        base_price: 14.99,
        images: [
            "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=800&q=80",
            "https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80",
        ],
        tags: ["Best Seller"],
        details: {
            dimensions:
                "Stem: 55cm length, 15cm spread · Vase: 20×10cm, 40cm total",
            care: "Wipe with a damp cloth. Store upright to maintain shape. Dust with a microfiber cloth.",
        },
        variants: [
            {
                id: "v-dusty-stem",
                type: "Single Stem",
                price: 14.99,
                original_price: 19.99,
                stock: 60,
            },
            {
                id: "v-dusty-vase",
                type: "Vase Arrangement",
                price: 64.99,
                original_price: 79.99,
                stock: 15,
                image_url:
                    "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80",
            },
        ],
        created_at: "2025-11-15T00:00:00Z",
    },

    // ══════════════ 4. Lavender Meadow ══════════════
    {
        id: "p-lavender",
        name: "Lavender Meadow",
        slug: "lavender-meadow",
        description:
            "Delicate lavender sprigs that bring the serene beauty of Korean meadows indoors. Features multiple realistic buds along each stem with a natural slight curve. Pairs beautifully with dried arrangements. Also available as a premium faux eucalyptus wholesale box.",
        base_price: 12.99,
        images: [
            "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=800&q=80",
            "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=800&q=80",
        ],
        tags: [],
        details: {
            dimensions:
                "Stem: 45cm, 8-10 buds per stem · Box: 65×25×25cm, 50 stems",
            care: "Handle gently to avoid bud detachment. Dust with a soft brush. Store flat or upright.",
        },
        variants: [
            {
                id: "v-lavender-stem",
                type: "Single Stem",
                price: 12.99,
                original_price: null,
                stock: 80,
            },
            {
                id: "v-lavender-box",
                type: "Wholesale Box",
                price: 149.99,
                original_price: null,
                stock: 20,
                image_url:
                    "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=800&q=80",
            },
        ],
        created_at: "2025-12-01T00:00:00Z",
    },

    // ══════════════ 5. Seoul Garden Orchid ══════════════
    {
        id: "p-orchid",
        name: "Seoul Garden Orchid",
        slug: "seoul-garden-orchid",
        description:
            "An exquisite phalaenopsis orchid arrangement in a premium matte-finish pot. Features three arching stems with lifelike blooms and realistic aerial roots. This luxury piece brings the refined elegance of Korean garden culture to your home.",
        base_price: 109.99,
        images: [
            "https://images.unsplash.com/photo-1567696153798-9111f9cd3d0d?w=800&q=80",
            "https://images.unsplash.com/photo-1610397648930-477b8c7f0943?w=800&q=80",
        ],
        tags: ["New Arrival"],
        details: {
            dimensions: "Pot: 14×14cm, Arrangement height: 55cm",
            care: "Wipe leaves with a damp cloth monthly. Avoid placing near heat sources.",
        },
        variants: [
            {
                id: "v-orchid-vase",
                type: "Vase Arrangement",
                price: 109.99,
                original_price: null,
                stock: 7,
            },
        ],
        created_at: "2026-01-20T00:00:00Z",
    },

    // ══════════════ 6. Korean Wildflower ══════════════
    {
        id: "p-wildflower",
        name: "Korean Wildflower",
        slug: "korean-wildflower",
        description:
            "A curated mix of delicate wildflower stems inspired by the native flora of Korean countryside. Includes daisies, cosmos, baby's breath, and small roses in soft pastels. Perfect for creating natural, garden-fresh arrangements.",
        base_price: 16.99,
        images: [
            "https://images.unsplash.com/photo-1471696035578-3d8c78d99571?w=800&q=80",
            "https://images.unsplash.com/photo-1460039230329-eb070f0a6cf5?w=800&q=80",
        ],
        tags: ["Best Seller"],
        details: {
            dimensions:
                "Stem: 35-50cm length · Box: 55×35×30cm, 40 stems",
            care: "Separate stems upon arrival. Arrange loosely for the most natural appearance.",
        },
        variants: [
            {
                id: "v-wildflower-stem",
                type: "Single Stem",
                price: 16.99,
                original_price: null,
                stock: 50,
            },
            {
                id: "v-wildflower-box",
                type: "Wholesale Box",
                price: 199.99,
                original_price: null,
                stock: 12,
                image_url:
                    "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=800&q=80",
            },
        ],
        created_at: "2025-11-20T00:00:00Z",
    },
];
