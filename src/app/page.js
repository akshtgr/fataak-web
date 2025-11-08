import ProductScroll from '@/components/ProductScroll';
import { db } from '@/lib/firebase'; // Import our new firebase db connection
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

/**
 * This function fetches products from your 'items' collection in Firestore.
 */
async function getProducts(filters = {}) {
  try {
    const itemsCol = collection(db, 'items'); // Your collection is named 'items'

    let q = query(itemsCol);

    // Apply filters
    if (filters.isFeatured) {
      q = query(q, where('is_featured', '==', true));
    }
    if (filters.category) {
      q = query(q, where('category', '==', filters.category));
    }

    q = query(q, limit(10));

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      console.log(`No matching documents for filter:`, filters);
      return [];
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// This is now an 'async function'
export default async function Home() {
  // Fetch data on the server
  const featuredProducts = await getProducts({ isFeatured: true });
  const vegetables = await getProducts({ category: 'vegetable' });
  const fruits = await getProducts({ category: 'fruit' });

  return (
    <main className="min-h-screen">
      <div className="p-4">
        <h1 className="text-4xl font-extrabold text-green-600">Fataak</h1>
        <p className="text-lg text-gray-700">Fresh Veggies, Delivered Fast.</p>
      </div>

      <ProductScroll title="Featured Products" products={featuredProducts} />
      <ProductScroll title="Fresh Vegetables" products={vegetables} />
      <ProductScroll title="Fresh Fruits" products={fruits} />
    </main>
  );
}