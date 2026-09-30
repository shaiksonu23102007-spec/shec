function SectionTitle({ kicker, title, action }) {
  return (
    <div className="section-head">
      <div>
        <div className="kicker">{kicker}</div>
        <h2>{title}</h2>
      </div>
      {action ? <a href={action.href} className="link-arrow">{action.label}</a> : null}
    </div>
  );
}

export default SectionTitle;
