import { toast } from "sonner";
import { X } from "lucide-react";

interface ShareSheetProps {
  onClose: () => void;
}

const ShareSheet = ({ onClose }: ShareSheetProps) => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("복사됐어요! ✅");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-[430px] bg-card rounded-t-3xl p-6 pb-10 animate-slide-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.3s ease-out" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground mb-6">친구나 파트너에게 공유해요 💌</h2>

        <div className="space-y-3">
          <button
            onClick={() => toast("카카오톡 공유 기능은 준비 중이에요!")}
            className="w-full h-14 rounded-2xl font-semibold text-lg transition-opacity hover:opacity-90"
            style={{ backgroundColor: "#FEE500", color: "#191919" }}
          >
            카카오톡으로 공유
          </button>
          <button
            onClick={copyLink}
            className="w-full h-14 rounded-2xl bg-muted text-foreground font-semibold text-lg hover:bg-muted/80 transition-colors"
          >
            링크 복사하기
          </button>
        </div>

        <p className="text-sm text-muted-foreground text-center mt-4">
          로그인 없이도 링크로 바로 볼 수 있어요
        </p>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default ShareSheet;
