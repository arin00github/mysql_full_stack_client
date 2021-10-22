interface IListItem {
  name: string;
  code: string;
  onSelectItem: any;
  key: string;
  isHighlighted: boolean;
}

export default function AutoCompleteItem({ name, code, isHighlighted, onSelectItem }: IListItem) {
  return (
    <li className={`list-group-item ${isHighlighted ? 'active' : ''}`} onClick={onSelectItem}>
      <div className="row">
        <div className="col">
          <p>
            {name} <span className="ml-3 d-inline-block">{code}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
