const StepBar = ({ total = 3, current = 1 }) => (
  <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        style={{
          minWidth: '138px', height: '5px', borderRadius: '4px',
          background: i < current ? '#f19517' : '#D9D9D9', flex: 1,
        }}
      />
    ))}
  </div>
);

export default StepBar;
