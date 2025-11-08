import ProductScroll from '@/components/ProductScroll';
import { db } from '@/lib/firebase'; // Import our new firebase db connection
import { collection, getDocs, query, where, limit } from 'firebase/firestore';

/**
 * This function fetches products from your 'items' COLLECTION in Firestore.
 */
async function getProducts(filters = {}) {
  try {
    const itemsCol = collection(db, 'items');
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

    // Map the documents and FIX the timestamp issue
    const products = snapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert Timestamp objects to simple, serializable ISO strings
      return {
        id: doc.id,
        ...data,
        created_at: data.created_at
          ? data.created_at.toDate().toISOString()
          : null,
        updated_at: data.updated_at
          ? data.updated_at.toDate().toISOString()
          : null,
      };
    });

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// This is an 'async function'
export default async function Home() {
  // Fetch data on the server
  const featuredProducts = await getProducts({ isFeatured: true });
  const vegetables = await getProducts({ category: 'vegetable' });
  const fruits = await getProducts({ category: 'fruit' });

  return (
    <main className="min-h-screen">
      {/* <div className="p-4">
        We moved this to the new Header component
      </div> */}

      <ProductScroll title="Featured Products" products={featuredProducts} />
      <ProductScroll title="Fresh Vegetables" products={vegetables} />
      <ProductScroll title="Fresh Fruits" products={fruits} />
    </main>
  );
}