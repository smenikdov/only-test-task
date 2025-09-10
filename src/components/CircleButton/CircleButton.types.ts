export type CircleButtonVariant = 'outlined' | 'filled';
export type CircleButtonSize = 'sm' | 'md' | 'lg';

export interface CircleButtonProps extends React.ButtonHTMLAttributes<HTMLElement> {
    icon:       React.ReactNode;
    disabled?:  boolean;
    onClick?:   () => void;
    className?: string;
    variant?:   CircleButtonVariant;
    size?:      CircleButtonSize;
}

