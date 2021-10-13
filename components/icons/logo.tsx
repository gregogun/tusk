/* eslint-disable react/jsx-props-no-spreading */
import { svg } from '@/styles/svg';
import useMediaQuery from '@/utils/hooks/useMediaQuery';

export const Logo = ({ ...props }) => {
  const isLarge = useMediaQuery('(min-width: 768px)');

  if (isLarge) {
    return (
      <svg
        className={svg({
          css: {
            ...props.css,
          },
        })}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 177 64"
        {...props}
      >
        <path
          d="M60.833 51.325c-2.007 2.153-5.093 3.955-9.794 3.766-11.209-.447-13.54-13.36-13.54-13.36l2.688 1.44c.358.217.724.434 1.098.644 2.805 1.499 7.203 3.002 7.203 3.002 1.238 2.412 3.687 4.334 8.464.489 4.091-3.293 1.309-7.947-1.053-10.73l-.915-1.09-2.588-3.206c-.58-.938-.893-1.612-.904-1.634-.706-1.898-.823-4.127 1.464-5.545l1.859 1.688-.494.554c-.12.229-.214.537-.208.944.151.86.91 2.176 3.08 4.152h-.002l.029.026c.225.204.467.416.723.635 1.196 1.092 3.508 3.406 4.614 5.877 2.68 6.426-.33 10.789-1.724 12.348z"
          fill="var(--colors-white)"
          fillOpacity={0.923}
        />
        <path
          d="M56.376 43.778s-2.52 1.7-7.11 1.306a14.328 14.328 0 01-1.992-.287c-1.987-.401-4.276-1.19-6.839-2.59l.002-.002a53.825 53.825 0 01-5.117-3.013l-.69.916c-1.72-.142-4.648-2.474-6.536-4.14.475-4.328-1.48-12.235-1.48-12.235.162 2.947-.32 10.568-.32 10.568-.076 1.504-.2 2.637-.34 3.502v.006c-.162.978-.344 1.602-.515 2.002l-.005.012a2.728 2.728 0 01-.167.333l-.398.797c-1.382 3.339-2.266 2.878-2.266 2.878C21.169 43.473 10.39 29.62 10.39 29.62c-1.916 0-3.993-1.34-5.634-2.729a24.99 24.99 0 01-.63-.554C1.914 24.3 1.1 22.435.882 21.841-2.768 10.87 14.238 9.034 14.238 9.034c7.44-.896 13.724 2.822 13.724 2.822 7.181-1.41 11.67 1.898 11.67 1.898s9.877 16.444 8.723 27.987c-.053.523-.14 1.05-.247 1.577 2.345.599 5.072.845 7.846.112 0 0 .395-.156.504-.039.008.014.018.022.025.04.09.255-.107.347-.107.347z"
          fill="var(--colors-white)"
          fillOpacity={0.923}
        />
        <path
          d="M80.759 52.519c1.536 0 3.84-.288 5.424-.864v-6.24c-.768.192-1.728.336-2.4.336-1.776 0-2.928-1.296-2.928-3.216V33.51h5.184v-6.384h-5.184v-7.728h-7.056l-1.632 7.728h-3.504v6.384h3.168v9.456c0 5.712 3.504 9.552 8.928 9.552zm24.499-25.392v13.632c0 2.496-1.632 4.224-3.744 4.224s-3.456-1.68-3.456-4.08V27.127h-8.976v15.456c0 5.76 3.6 9.888 8.736 9.888 2.928 0 4.992-1.296 6.96-4.224h.48v3.648h8.976V27.127h-8.976zm24.357 25.584c7.872 0 12.72-3.36 12.72-8.88 0-5.856-5.664-6.96-10.176-7.44-3.312-.384-6.24-.48-6.24-2.352 0-1.344 1.44-2.256 3.456-2.256 2.304 0 3.936 1.152 3.984 2.88h7.968c0-5.088-5.088-8.304-11.952-8.304-7.056 0-11.712 3.264-11.712 8.496 0 6.864 6.576 7.248 11.04 7.68 2.592.24 4.704.528 4.704 2.304 0 1.488-1.488 2.4-3.6 2.4-2.832 0-4.656-1.392-4.656-3.504h-7.632c0 5.568 4.656 8.976 12.096 8.976zm24.981-.816v-9.936h.48l6.48 9.936h10.656l-9.36-12.864 9.216-11.904h-10.56l-6.432 9.072h-.48V16.087h-8.976v35.808h8.976z"
          fill="var(--colors-white)"
        />
      </svg>
    );
  }

  return (
    <svg
      className={svg({
        css: {
          ...props.css,
        },
      })}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...props}
    >
      <path
        d="M60.833 51.325c-2.007 2.153-5.093 3.955-9.794 3.766-11.209-.447-13.54-13.36-13.54-13.36l2.688 1.44c.358.217.724.434 1.098.644 2.805 1.499 7.203 3.002 7.203 3.002 1.238 2.412 3.687 4.334 8.464.489 4.091-3.293 1.309-7.947-1.053-10.73l-.915-1.09-2.588-3.206c-.58-.938-.893-1.612-.904-1.634-.706-1.898-.823-4.127 1.464-5.545l1.859 1.688-.494.554c-.12.229-.214.537-.208.944.151.86.91 2.176 3.08 4.152h-.002l.029.026c.225.204.467.416.723.635 1.196 1.092 3.508 3.406 4.614 5.877 2.68 6.426-.33 10.789-1.724 12.348z"
        fill="var(--colors-white)"
        fillOpacity={0.923}
      />
      <path
        d="M56.376 43.778s-2.52 1.7-7.11 1.306a14.328 14.328 0 01-1.992-.287c-1.987-.401-4.276-1.19-6.839-2.59l.002-.002a53.825 53.825 0 01-5.117-3.013l-.69.916c-1.72-.142-4.648-2.474-6.536-4.14.475-4.328-1.48-12.235-1.48-12.235.162 2.947-.32 10.568-.32 10.568-.076 1.504-.2 2.637-.34 3.502v.006c-.162.978-.344 1.602-.515 2.002l-.005.012a2.728 2.728 0 01-.167.333l-.398.797c-1.382 3.339-2.266 2.878-2.266 2.878C21.169 43.473 10.39 29.62 10.39 29.62c-1.916 0-3.993-1.34-5.634-2.729a24.99 24.99 0 01-.63-.554C1.914 24.3 1.1 22.435.882 21.841-2.768 10.87 14.238 9.034 14.238 9.034c7.44-.896 13.724 2.822 13.724 2.822 7.181-1.41 11.67 1.898 11.67 1.898s9.877 16.444 8.723 27.987c-.053.523-.14 1.05-.247 1.577 2.345.599 5.072.845 7.846.112 0 0 .395-.156.504-.039.008.014.018.022.025.04.09.255-.107.347-.107.347z"
        fill="var(--colors-white)"
        fillOpacity={0.923}
      />
    </svg>
  );
};
