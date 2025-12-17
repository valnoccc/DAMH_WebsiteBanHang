import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <div>
                <p className="text-sm text-gray-600 mb-6">
                    Khi bạn xóa tài khoản, tất cả dữ liệu sẽ bị xóa vĩnh viễn. Hành động này không thể hoàn tác.
                </p>

                <button 
                    type="button"
                    onClick={confirmUserDeletion}
                    className="px-6 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 transition-all hover:scale-105"
                >
                    Xóa Tài Khoản
                </button>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-8">
                    <h2 className="text-2xl font-black text-red-600 mb-4">
                        Xác Nhận Xóa Tài Khoản
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Bạn chắc chắn muốn xóa tài khoản? Hành động này sẽ xóa vĩnh viễn tất cả dữ liệu của bạn. Vui lòng nhập mật khẩu để xác nhận.
                    </p>

                    <div className="mb-6">
                        <InputLabel
                            htmlFor="password"
                            value="Mật Khẩu"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-2 block w-full border-2 border-red-300 rounded-lg px-4 py-3 focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                            isFocused
                            placeholder="Nhập mật khẩu"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-6 py-3 bg-gray-300 text-gray-800 font-bold rounded-lg hover:bg-gray-400 transition-all"
                        >
                            Hủy
                        </button>

                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-3 bg-red-600 text-white font-black rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? 'Đang Xóa...' : 'Xóa Tài Khoản'}
                        </button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
