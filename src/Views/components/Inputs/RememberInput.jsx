export default function RememberInput({ register }) {
  return (
    <div className="flex items-start my-5">
      <div className="flex items-center h-5">
        <input
          id="remember"
          {...register('remember')}
          aria-describedby="remember"
          type="checkbox"
          className="accent-asiseg-blue w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-asiseg-blue focus:focus:border-asiseg-blue "
          required=""
        />
      </div>
      <div className="ml-3 text-sm">
        <label htmlFor="remember" className="text-gray-500 ">
          Recordarme
        </label>
      </div>
    </div>
  )
}
