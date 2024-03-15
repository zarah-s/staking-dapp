interface Props {
  label: string;
  value: number;
}
const PoolDetail = ({ label, value }: Props) => {
  return (
    <div className="flex items-center gap-3 justify-between">
      <h3 className="text-[rgba(255,255,255,.8)] font00] text-sm">{label}:</h3>
      <small className="text-[rgba(255,255,255,.5)] text-xs">{value}</small>
    </div>
  );
};

export default PoolDetail;
