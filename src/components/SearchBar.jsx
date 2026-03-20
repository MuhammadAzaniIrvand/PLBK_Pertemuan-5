// src/components/SearchBar.jsx
export default function SearchBar({ searchQuery, setSearchQuery }) {
  return (
    <div style={{ marginBottom: '1.5rem' }}>
      <input
        type="text"
        placeholder="Cari produk berdasarkan nama..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.8rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '1rem',
        }}
      />
    </div>
  );
}