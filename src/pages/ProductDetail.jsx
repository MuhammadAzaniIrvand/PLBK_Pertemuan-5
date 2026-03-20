// src/pages/ProductDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../services/api';
import { useCart } from '../context/CartContext';
import Loading from '../components/Loading';

export default function ProductDetail() {
  const { id } = useParams(); // Mengambil ID dari URL
  const [product, setProduct] = useState(null);
  const[loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <p style={{ color: 'red', textAlign:'center', marginTop: '2rem' }}>Error: {error}</p>;
  if (!product) return <p style={{ textAlign:'center', marginTop: '2rem' }}>Produk tidak ditemukan</p>;

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 300px' }}>
        <img 
          src={product.image} 
          alt={product.title} 
          style={{ width: '100%', border: '1px solid #ddd', borderRadius: '8px', padding: '1rem', background: 'white' }} 
        />
      </div>
      <div style={{ flex: '2 1 400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/" style={{ textDecoration: 'none', color: '#1B4F72', fontWeight: 'bold' }}>&larr; Kembali ke Katalog</Link>
        <h2 style={{ margin: 0 }}>{product.title}</h2>
        <span style={{ display: 'inline-block', background: '#EBF5FB', color: '#1B4F72', padding: '0.3rem 0.8rem', borderRadius: '15px', width: 'max-content', textTransform: 'capitalize' }}>
          {product.category}
        </span>
        <h3 style={{ color: '#E67E22', fontSize: '1.8rem', margin: 0 }}>${product.price.toFixed(2)}</h3>
        <p style={{ lineHeight: '1.6', color: '#555' }}>{product.description}</p>
        <button
          onClick={() => addItem(product)}
          style={{
            padding: '1rem', background: '#27AE60', color: 'white', border: 'none',
            borderRadius: '4px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 'bold',
            marginTop: '1rem'
          }}
        >
          + Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}