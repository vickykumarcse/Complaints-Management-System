class UsersController < ApplicationController
    before_action :set_user, only: [:edit, :update, :destroy]

  # GET /users
  # GET /users.json
  def index
      if params[:search]!=nil and params[:search]!=""
          $str=params[:search].to_s
          $str=$str.downcase
          @complains = Complain.where("lower(title) LIKE ?", "%#{$str}%")
          
      else
          if(current_user.usertypeid==2)
              @complains=Complain.where(:wardid=>current_user.wardid).order("votecount DESC")
          else
              @complains=Complain.where(:admin_username =>current_user.username).order("votecount DESC")
          end
      end
       @complains = @complains.paginate(:page => params[:page], :per_page => 6)
  end

  # GET /users/1
  # GET /users/1.json
  def show
      $str=params[:fetch]
      if $str=="filter-by-ward"
          @complains=Complain.where(:wardid=>current_user.wardid).order("votecount DESC")
      elsif $str=="filter-by-zone"
        @complains=Complain.where(:admin_username =>(Zone.where(:id =>Ward.where(:wardno=>current_user.wardid).first.zoneid).first.admin_username)).order("votecount DESC")
      elsif $str=="sort-by-likes"
            if current_user.usertypeid==2
                @complains=Complain.where(:wardid=>current_user.wardid).order("votecount DESC")
             else 
                @complains=Complain.where(:admin_username=>current_user.username).order("votecount DESC")
             end
      elsif $str=="sort-by-zoneno"
           if current_user.usertypeid==2
               @complains=Complain.where(:wardid=>current_user.wardid).order("wardid DESC")
           else
                @complains=Complain.where(:admin_username=>current_user.username).order("wardid DESC")
           end
      elsif $str=="sort-by-latest"
        if current_user.usertypeid==2
            @complains=Complain.where(:wardid=>current_user.wardid).order("created_at DESC")
           else
            @complains=Complain.where(:admin_username=>current_user.username).order("created_at DESC")
           end
      elsif $str=="sort-by-oldest"
            if current_user.usertypeid==2
             @complains=Complain.where(:wardid=>current_user.wardid).order("created_at")
           else
             @complains=Complain.where(:admin_username=>current_user.username).order("created_at")
           end
      end
      @complains = @complains.paginate(:page => params[:page], :per_page => 6)
  end
    

 #----------------------------------------------------   
def myComplains
    @complains=Complain.where(:public_username=>current_user.username)
        
end
#----------------------------------------------------

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
      
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:username, :firstname, :lastname, :contactno, :email, :wardid, :password, :usertypeid)
    end
end
