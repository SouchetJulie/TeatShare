import {FunctionComponent} from 'react';

const upload: FunctionComponent = () => {

    return (
        <form action={'/api/lesson'} method="POST" encType="multipart/form-data">
            <label htmlFor="lesson_upload_form_title">Titre</label>
            <input id="lesson_upload_form_title" name="title" placeholder="Les tables de multiplication"/>

            <label htmlFor="lesson_upload_form_subtitle">Sous-titre</label>
            <input id="lesson_upload_form_subtitle" name="subtitle" placeholder="Multiplier des nombres de 1 à 10..."/>

            <label htmlFor="lesson_upload_form_file">Fichier</label>
            <input
                id="lesson_upload_form_file"
                name="file"
                type="file"
                accept="application/pdf"
                required
            />

            <button>Envoyer</button>
        </form>
    );
};

export default upload;
