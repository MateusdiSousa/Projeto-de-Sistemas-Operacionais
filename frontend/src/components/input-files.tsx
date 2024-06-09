interface InputFileProps {
    files: File[]
    setFiles: Function
    label: string
}

export function InputFile(props: InputFileProps) {
    return (
        <div className="flex">
            <label className="form-control w-full max-w-xs">
                <input multiple onChange={(e) => props.setFiles(e)} type="file" className="file-input file-input-sm file-input-bordered w-full max-w-xs" />
                <div className="label">
                    <span className="label-text-alt">{props.label}</span>
                </div>
            </label>

            <ul>
                {props.files.map((file, index) => (
                    <li key={index}>{file.name}</li>
                ))}
            </ul>
        </div>)
}